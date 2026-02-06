/**
 * @fileoverview 画布组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了基本的画布组件，用于显示图形元素。
 *          该组件提供以下功能：
 *          - 使用 react-konva 创建画布
 *          - 支持图层管理
 *          - 支持基本图形绘制
 *
 *          依赖关系：
 *          - 依赖 react-konva 模块进行画布渲染
 */
import { Stage, Layer, Circle } from 'react-konva';

function Canvas() {
  return (
    <Stage width={200} height={200}>
      <Layer>
        <Circle x={200} y={100} radius={50} fill="green" />
      </Layer>
    </Stage>
  );
}

export default Canvas;