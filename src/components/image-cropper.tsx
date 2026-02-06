/**
 * @fileoverview 图片裁剪组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了图片裁剪组件，用于裁剪图片。
 *          该组件提供以下功能：
 *          - 支持图片裁剪
 *          - 支持比例锁定
 *          - 支持缩放操作
 *
 *          依赖关系：
 *          - 依赖 react-mobile-cropper 模块进行图片裁剪
 */
import React from 'react';
import { Cropper } from 'react-mobile-cropper';
import 'react-mobile-cropper/dist/style.css'

interface PropsData {
    src: string
    setSrc: (src: string) => void
    payload: any,
    setPayload: (data: any) => void
}

const ImageCropper = ({ src, setSrc, payload, setPayload }: PropsData) => {
    const cropperRef = React.useRef<any>(null);
    const [image, setImage] = React.useState<any>(null)
    const [imageRatio, setImageRatio] = React.useState(0)
    const [ratio, setRatio] = React.useState<null | Number>(null)

    // :src
    React.useEffect(() => {
        if (cropperRef.current) {
            cropperRef.current.refresh();
        }
        const img = new Image()
        img.src = src
        img.onload = () => {
            setTimeout(() => {
                setImage(img)
            }, 200)
            setImageRatio(img.width / img.height)
        }
        img.onerror = () => {
            console.log('Load image error')
        }
    }, [src]);

    // ratio
    React.useEffect(() => {
        if (cropperRef.current) {
            if (payload.ratio) {
                setRatio(payload.ratio)
            } else {
                setRatio(imageRatio)
                setTimeout(() => {
                    setRatio(0)
                }, 20)

            }
            setTimeout(() => {
                cropperRef.current.zoomImage(0.1); // zoom-in 
                setPayload((preData: any) => { return { ...preData, canvas: cropperRef.current.getCanvas() } });
            }, 30)
        }
    }, [payload.ratio])

    const onChange = () => {
        setPayload((preData: any) => { return { ...preData, canvas: cropperRef.current.getCanvas() } });
    };

    if (!image) return <img src={src} alt="Cropped image" className='w-full h-auto'></img>

    return (
        <Cropper
            ref={cropperRef}
            src={src}
            onChange={onChange}
            stencilProps={{
                aspectRatio: ratio || {
                    minimum: 1 / 16,
                    maximum: 16,
                },

                movable: false,
                resizable: true
            }}
        />
    )
};

export default ImageCropper;