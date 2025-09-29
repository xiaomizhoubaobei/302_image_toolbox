import ReactDOM from "react-dom";
import React, { useState, useRef, useEffect, useCallback } from "react";
import cn from "classnames";
import {
  Cropper,
  CropperRef,
  CropperPreview,
  CropperPreviewRef
} from "react-advanced-cropper";
import { AdjustablePreviewBackground } from "./components/AdjustablePreviewBackground";
import { Navigation } from "./components/Navigation";
import { Slider } from "./components/Slider";
import AdjustableCropperBackground from "./components/AdjustableCropperBackground";
import { Button } from "./components/Button";
import { ResetIcon } from "./icons/ResetIcon";
import "react-advanced-cropper/dist/style.css";
import "./styles.scss";
// import debounce from 'lodash/debounce';
// import { throttle } from "lodash";

interface PropsData {
  src: string
  setSrc: (src: string) => void
  setPayload: (data: any) => void
}

// The polyfill for Safari browser. The dynamic require is needed to work with SSR
if (typeof window !== 'undefined') {
  require('context-filter-polyfill');
}

export const ImageEditor: React.FC<PropsData> = ({ src, setSrc, setPayload }) => {
  const cropperRef = useRef<CropperRef>(null);
  const previewRef = useRef<CropperPreviewRef>(null);
  const [image, setImage] = React.useState<any>(null)
  const [mode, setMode] = useState("saturation");
  const [size, setSize] = useState({ width: 100, height: 100 })

  type Adjustments = {
    [key: string]: number;
    brightness: number;
    hue: number;
    saturation: number;
    contrast: number;
  };

  const [adjustments, setAdjustments] = useState<Adjustments>({
    brightness: 0,
    hue: 0,
    saturation: 0,
    contrast: 0
  });

  const onChangeValue = (value: number) => {
    if (mode in adjustments) {
      setAdjustments((previousValue) => ({
        ...previousValue,
        [mode]: value
      }));
    }
  };

  const onReset = () => {
    setMode("saturation")
    setAdjustments({
      brightness: 0,
      hue: 0,
      saturation: 0,
      contrast: 0
    });
  };

  const onUpload = (blob: string) => {
    onReset();
    setMode("crop");
    setSrc(blob);
  };

  const onDownload = () => {
    if (cropperRef.current) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.body.innerHTML = `<img src="${cropperRef.current
          .getCanvas()
          ?.toDataURL()}"/>`;
      }
    }
  };

  const onUpdate = () => {
    if (cropperRef.current) {
      console.log('upd:::', cropperRef.current.getCanvas())
    }
    previewRef.current?.refresh();
  };

  const changed = Object.values(adjustments).some((el) => Math.floor(el * 100));

  const cropperEnabled = mode === "crop";

  const handleActionDone = () => {
    if (cropperRef.current) {
      setPayload((preData: any) => { return { ...preData, canvas: cropperRef.current!.getCanvas() } });
    }
  }

  useEffect(() => {
    onReset()
    const img = new Image()
    img.src = src
    img.onload = () => {
      setTimeout(() => {
        setImage(img)
      }, 200)
      setSize({ width: img.width, height: img.height })
    }
    img.onerror = () => {
      console.log('Load image error')
    }
  }, [src])


  if (!image) return <img src={src} className='w-full h-auto'></img>


  return (
    <div
      className=" w-full relative !bg-red"
      onMouseUp={() => handleActionDone()}
      onTouchEnd={() => handleActionDone()}
    >

      <Cropper
        className=""
        style={{ background: 'none', border: 'none' }}
        src={src}
        ref={cropperRef}
        stencilProps={{
          movable: cropperEnabled,
          resizable: cropperEnabled,
          lines: cropperEnabled,
          handlers: cropperEnabled,
          overlayClassName: cn(
            "image-editor__cropper-overlay",
            !cropperEnabled && "image-editor__cropper-overlay--faded"
          )
        }}
        backgroundWrapperProps={{
          scaleImage: cropperEnabled,
          moveImage: cropperEnabled
        }}
        backgroundComponent={AdjustableCropperBackground}
        backgroundProps={adjustments}
        // onUpdate={onUpdate}
        defaultCoordinates={{
          top: 0,
          left: 0,
          width: size.width,
          height: size.height,
        }}
      />

      <div className="action absolute left-0 bottom-0 w-full bg-black/80 p-4 pb-2">
        {mode && (
          <div className="w-full flex justify-center">
            <Slider
              value={adjustments[mode]}
              onChange={onChangeValue}
            />
          </div>
        )}

        <Navigation
          className="w-full"
          mode={mode}
          onChange={setMode}
          onUpload={onUpload}
          onDownload={onDownload}
          onReset={onReset}
        />
      </div>



    </div>
  );
};

