import { RiImageEditLine } from "react-icons/ri";

import RemoveBgIcon from "../icons/remove-bg.svg";
import RemoveObjIcon from "../icons/remove-obj.svg";
import ReplaceBgIcon from "../icons/replace-bg.svg";
import VectorizeIcon from "../icons/vectorize.svg";
import UpscaleIcon from "../icons/upscale.svg";
import SuperUpscaleIcon from "../icons/super-upscale.svg";
import ColorizeIcon from "../icons/colorize.svg";
import SwapFaceIcon from "../icons/swap-face.svg";
import UncropIcon from "../icons/uncrop.svg";
import InpaintIcon from "../icons/inpaint-img.svg";
import RecreateImgIcon from "../icons/recreate-img.svg";
import SketchImgIcon from "../icons/sketch-img.svg";
import CropImgIcon from "../icons/crop-img.svg";
import FilterImgIcon from "../icons/filter-img.svg";
import ReadTextIcon from "../icons/read-text.svg";
import CreateVideoIcon from "../icons/create-video.svg";
import CharacterIcon from "../icons/character.svg";
import StitchingIcon from "../icons/stitching.svg";
import TranslateTextIcon from "../icons/translte-text.svg"
import EraseTextIcon from "../icons/erase-text.svg"

export const ToolIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'remove-bg':
      return <RemoveBgIcon />
    case 'remove-obj':
      return <RemoveObjIcon />
    case 'replace-bg':
      return <ReplaceBgIcon />
    case 'vectorize':
      return <VectorizeIcon />
    case 'upscale':
      return <UpscaleIcon />
    case 'super-upscale':
      return <SuperUpscaleIcon />
    case 'colorize':
      return <ColorizeIcon />
    case 'swap-face':
      return <SwapFaceIcon />
    case 'uncrop':
      return <UncropIcon />
    case 'inpaint-img':
      return <InpaintIcon />
    case 'recreate-img':
      return <RecreateImgIcon />
    case 'sketch-img':
      return <SketchImgIcon />
    case 'crop-img':
      return <CropImgIcon />
    case 'filter-img':
      return <FilterImgIcon />
    case 'read-text':
      return <ReadTextIcon />
    case 'create-video':
      return <CreateVideoIcon />
    case 'character':
      return <CharacterIcon />
    case 'stitching':
      return <StitchingIcon />
    case 'translate-text':
      return <TranslateTextIcon />
    case 'erase-text':
      return <EraseTextIcon />
    default:
      return <RiImageEditLine className='w-8 h-8' />
  }
}