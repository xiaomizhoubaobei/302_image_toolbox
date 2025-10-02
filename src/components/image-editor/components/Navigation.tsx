import React, { ChangeEvent, FC, useRef } from "react";
import cn from "classnames";
import { CropIcon } from "../icons/CropIcon";
import { HueIcon } from "../icons/HueIcon";
import { SaturationIcon } from "../icons/SaturationIcon";
import { ContrastIcon } from "../icons/ContrastIcon";
import { BrightnessIcon } from "../icons/BrightnessIcon";
import { UploadIcon } from "../icons/UploadIcon";
import { DownloadIcon } from "../icons/DownloadIcon";
import { ResetIcon } from "../icons/ResetIcon";
import { Button } from "./Button";
import "./Navigation.scss";

interface Props {
  className?: string;
  mode?: string;
  onChange?: (mode: string) => void;
  onDownload?: () => void;
  onUpload?: (blob: string) => void;
  onReset?: () => void;
}

export const Navigation: FC<Props> = ({
  className,
  onChange,
  onUpload,
  onDownload,
  onReset,
  mode
}) => {
  const setMode = (mode: string) => () => {
    onChange?.(mode);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadButtonClick = () => {
    inputRef.current?.click();
  };

  const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
    // 获取DOM输入元素的引用
    const { files } = event.target;

    // 确保在尝试读取文件之前有文件存在
    if (files && files[0]) {
      if (onUpload) {
        onUpload(URL.createObjectURL(files[0]));
      }
    }
    // 清除事件目标值以允许重新上传相同图片
    event.target.value = "";
  };

  return (
    // <div className={cn("image-editor-navigation flex justify-center", className)}>
    <div className={cn("flex justify-center", className)}>
      {/* <Button
        className={"image-editor-navigation__button"}
        onClick={onUploadButtonClick}
      >
        <UploadIcon />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onLoadImage}
          className="image-editor-navigation__upload-input"
        />
      </Button> */}
      <div className="image-editor-navigation__buttons !text-white">
        {/* <Button
          className={"image-editor-navigation__button"}
          active={mode === "crop"}
          onClick={setMode("crop")}
        >
          <CropIcon />
        </Button> */}
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "saturation"}
          onClick={setMode("saturation")}
          title="鲜艳度"
        >
          <SaturationIcon />
        </Button>
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "brightness"}
          onClick={setMode("brightness")}
          title="亮度"
        >
          <BrightnessIcon />
        </Button>
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "contrast"}
          onClick={setMode("contrast")}
          title="对比度"
        >
          <ContrastIcon />
        </Button>
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "hue"}
          onClick={setMode("hue")}
          title="色调"
        >
          <HueIcon />
        </Button>
      </div>
      {/* <Button
        className={"image-editor-navigation__button"}
        onClick={onDownload}
      >
        <DownloadIcon />
      </Button> */}
      <Button
        className={"image-editor-navigation__button"}
        onClick={onReset}
        title="重置"
      >
        <ResetIcon />
      </Button>
    </div>
  );
};