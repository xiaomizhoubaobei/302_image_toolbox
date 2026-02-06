/**
 * @fileoverview 缩放框组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了缩放框组件，用于缩放和平移内容。
 *          该组件提供以下功能：
 *          - 支持缩放操作
 *          - 支持平移操作
 *          - 支持重置操作
 *          - 支持鼠标滚轮缩放
 *
 *          依赖关系：
 *          - 依赖 react-zoom-pan-pinch 模块进行缩放和平移
 */
import React from "react";
import { GoZoomIn } from "react-icons/go";
import { GoZoomOut } from "react-icons/go";
import { GrPowerReset } from "react-icons/gr";

import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";

const Controls = ({ tool }: any) => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  React.useEffect(() => {
    if (tool) {
      resetTransform()
    }
  }, [tool, resetTransform])

  return (
    <div className="tools absolute right-0 top-0 z-20 p-2 flex justify-end space-x-2 bg-black/30">
      <div
        className=" cursor-pointer text-lg text-white hover:text-primary hover:scale-110"
        onClick={() => zoomIn()}
      >
        <GoZoomIn />
      </div>
      <div
        className=" cursor-pointer text-lg text-white hover:text-primary hover:scale-110"
        onClick={() => zoomOut()}
      >
        <GoZoomOut />
      </div>
      <div
        className=" cursor-pointer text-lg text-white hover:text-primary hover:scale-110"
        onClick={() => resetTransform()}
      >
        <GrPowerReset />
      </div>
    </div>
  );
};

const ZoomBox = ({ move, tool, result, children }: any) => {
  if (['remove-obj', 'inpaint-img', 'uncrop',].includes(tool?.name) && !result) {
    return children
  }

  return (
    <div className="w-full h-full relative">
      <TransformWrapper
        initialScale={1}
        wheel={{ step: 0.1 }}
        minScale={0.2}
        panning={
          {
            disabled: !move,
          }
        }

      >
        <Controls tool={tool} />
        <TransformComponent
          wrapperClass={'!w-full !h-full'}
          contentClass={'!w-full !h-full'}
        >
          <div
            className="w-full h-full flex items-center justify-center"
          >
            {children}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </div >
  );

};

export default ZoomBox;