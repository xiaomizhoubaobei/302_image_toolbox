/**
 * @fileoverview 图标组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了图标组件，用于显示工具图标。
 *          该组件提供以下功能：
 *          - 根据工具名称显示对应图标
 *          - 支持多种工具类型
 *
 *          依赖关系：
 *          - 依赖 react-icons 模块获取图标
 */
import { RiImageEditLine } from "react-icons/ri";

export const ToolIcon = ({ icon }: { icon: string }) => {
  const getIconPath = (iconName: string) => `/icons/${iconName}.svg`;

  switch (icon) {
    case 'remove-bg':
      return <img src={getIconPath('remove-bg')} alt="remove-bg" className="w-8 h-8" />
    case 'remove-obj':
      return <img src={getIconPath('remove-obj')} alt="remove-obj" className="w-8 h-8" />
    case 'replace-bg':
      return <img src={getIconPath('replace-bg')} alt="replace-bg" className="w-8 h-8" />
    case 'vectorize':
      return <img src={getIconPath('vectorize')} alt="vectorize" className="w-8 h-8" />
    case 'upscale':
      return <img src={getIconPath('upscale')} alt="upscale" className="w-8 h-8" />
    case 'super-upscale':
      return <img src={getIconPath('super-upscale')} alt="super-upscale" className="w-8 h-8" />
    case 'colorize':
      return <img src={getIconPath('colorize')} alt="colorize" className="w-8 h-8" />
    case 'swap-face':
      return <img src={getIconPath('swap-face')} alt="swap-face" className="w-8 h-8" />
    case 'uncrop':
      return <img src={getIconPath('uncrop')} alt="uncrop" className="w-8 h-8" />
    case 'inpaint-img':
      return <img src={getIconPath('inpaint-img')} alt="inpaint-img" className="w-8 h-8" />
    case 'recreate-img':
      return <img src={getIconPath('recreate-img')} alt="recreate-img" className="w-8 h-8" />
    case 'sketch-img':
      return <img src={getIconPath('sketch-img')} alt="sketch-img" className="w-8 h-8" />
    case 'crop-img':
      return <img src={getIconPath('crop-img')} alt="crop-img" className="w-8 h-8" />
    case 'filter-img':
      return <img src={getIconPath('filter-img')} alt="filter-img" className="w-8 h-8" />
    case 'read-text':
      return <img src={getIconPath('read-text')} alt="read-text" className="w-8 h-8" />
    case 'create-video':
      return <img src={getIconPath('create-video')} alt="create-video" className="w-8 h-8" />
    case 'character':
      return <img src={getIconPath('character')} alt="character" className="w-8 h-8" />
    case 'stitching':
      return <img src={getIconPath('stitching')} alt="stitching" className="w-8 h-8" />
    case 'translate-text':
      return <img src={getIconPath('translte-text')} alt="translate-text" className="w-8 h-8" />
    case 'erase-text':
      return <img src={getIconPath('erase-text')} alt="erase-text" className="w-8 h-8" />
    default:
      return <RiImageEditLine className='w-8 h-8' />
  }
}