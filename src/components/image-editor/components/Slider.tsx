/**
 * @fileoverview 图像编辑器滑块组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了图像编辑器的滑块组件，用于调节滤镜参数。
 *          该组件提供以下功能：
 *          - 提供双向滑块调节功能
 *          - 支持鼠标和触摸事件
 *          - 显示当前调节值
 *          - 视觉反馈（填充、滑块位置）
 *          - 支持激活和聚焦状态
 *
 *          组件特性：
 *          - 使用 PureComponent 优化性能
 *          - 范围从 -1 到 1，中心点为 0
 *          - 响应窗口大小变化
 *          - 防止触摸滚动冲突
 *          - 自动隐藏中心位置的标签
 *
 *          视觉元素：
 *          - 填充条：显示当前调节范围
 *          - 滑块手柄：可拖动的控制点
 *          - 数值标签：显示当前值（+/- 百分比）
 *          - 中心点标记：表示零值位置
 *
 *          事件处理：
 *          - mousedown/touchstart: 开始拖动
 *          - mousemove/touchmove: 拖动中
 *          - mouseup/touchend: 结束拖动
 *
 *          依赖关系：
 *          - 依赖 React 的 PureComponent 基类
 *          - 导入 Slider.scss 样式文件
 */
import React, { PureComponent } from "react";
import cn from "classnames";
import "./Slider.scss";

/**
 * 滑块组件属性接口
 */
interface Props {
  /** 自定义类名，用于样式定制 */
  className?: string;
  /** 值变化回调函数 */
  onChange?: (value: number) => void;
  /** 当前滑块值，范围 -1 到 1 */
  value?: number;
  /** 是否显示数值标签 */
  showValue?: boolean;
}

/**
 * 图像编辑器滑块组件类
 * 提供双向滑块控件，支持鼠标和触摸交互
 */
export class Slider extends PureComponent<Props> {
  /** 滑块线的 DOM 引用 */
  line = React.createRef<HTMLDivElement>();

  /** 组件状态 */
  state = {
    /** 是否处于拖动聚焦状态 */
    focus: false,
    /** 滑块线的宽度 */
    width: 0
  };

  /**
   * 组件挂载后的初始化
   * 注册全局事件监听器并初始化宽度计算
   */
  componentDidMount() {
    window.addEventListener("resize", this.recalculateWidth);
    window.addEventListener("orientationchange", this.recalculateWidth);

    window.addEventListener("mouseup", this.onStop, { passive: false });
    window.addEventListener("mousemove", this.onDrag, { passive: false });
    window.addEventListener("touchmove", this.onDrag, { passive: false });
    window.addEventListener("touchend", this.onStop, { passive: false });

    const line = this.line.current;
    if (line) {
      line.addEventListener("mousedown", this.onStart);
      line.addEventListener("touchstart", this.onStart);
    }

    this.recalculateWidth();
  }
  /**
   * 组件卸载前的清理
   * 移除所有事件监听器
   */
  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onStop);
    window.removeEventListener("mousemove", this.onDrag);
    window.removeEventListener("touchmove", this.onDrag);
    window.removeEventListener("touchend", this.onStop);

    window.removeEventListener("resize", this.recalculateWidth);
    window.removeEventListener("orientationchange", this.recalculateWidth);

    const line = this.line.current;
    if (line) {
      line.removeEventListener("mousedown", this.onStart);
      line.removeEventListener("touchstart", this.onStart);
    }
  }
  /**
   * 拖动事件处理
   * 根据鼠标/触摸位置更新滑块值
   * @param e - 鼠标或触摸事件
   */
  onDrag = (e: MouseEvent | TouchEvent) => {
    const { onChange } = this.props;
    if (this.state.focus) {
      const position = "touches" in e ? e.touches[0].clientX : e.clientX;
      const line = this.line.current;

      if (line) {
        const { left, width } = line.getBoundingClientRect();

        if (onChange) {
          onChange(
            Math.max(
              -1,
              Math.min(1, (2 * (position - left - width / 2)) / width)
            )
          );
        }
      }
      if (e.preventDefault) {
        e.preventDefault();
      }
    }
  };
  /**
   * 停止拖动事件处理
   * 退出聚焦状态
   */
  onStop = () => {
    this.setState({
      focus: false
    });
  };

  /**
   * 开始拖动事件处理
   * 进入聚焦状态并立即触发拖动
   * @param e - 鼠标或触摸事件
   */
  onStart = (e: MouseEvent | TouchEvent) => {
    this.setState({
      focus: true
    });
    this.onDrag(e);
  };
  /**
   * 重新计算滑块线宽度
   * 响应窗口大小变化，更新宽度状态
   */
  recalculateWidth = () => {
    const line = this.line.current;
    if (line) {
      this.setState({
        width: line.clientWidth
      });
    }
  };

  /**
   * 渲染滑块组件
   * @returns 返回滑块 UI
   */
  render() {
    const { value = 0, className } = this.props;

    const handleInsideDot = this.state.width
      ? Math.abs(value) <= 16 / this.state.width
      : true;

    const fillWidth = `${Math.abs(value) * 50}%`;

    const fillLeft = `${50 * (1 - Math.abs(Math.min(0, value)))}%`;

    const formattedValue = `${value > 0 ? "+" : ""}${Math.round(100 * value)}`;

    return (
      <div className={cn("image-editor-slider", className)} ref={this.line}>
        <div className="image-editor-slider__line">
          <div
            className="image-editor-slider__fill !bg-primary"
            style={{
              width: fillWidth,
              left: fillLeft
            }}
          />
          <div className="image-editor-slider__dot !bg-primary" />
          <div
            className={cn(
              "image-editor-slider__value !text-[12px] !font-normal !text-primary",
              handleInsideDot && "image-editor-slider__value--hidden"
            )}
            style={{
              left: `${Math.abs(value * 50 + 50)}%`
            }}
          >
            {formattedValue}
          </div>
          <div
            className={cn(
              "image-editor-slider__handler !bg-primary",
              this.state.focus && "image-editor-slider__handler--focus",
              handleInsideDot && "image-editor-slider__handler--hidden"
            )}
            style={{
              left: `${value * 50 + 50}%`
            }}
          />
        </div>
      </div>
    );
  }
}
