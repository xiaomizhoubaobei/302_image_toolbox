import { Animation } from "konva/lib/Animation";
import React, { Component, useEffect, useRef } from "react";
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