import React, { useState } from 'react';
import { CropperRef, Cropper } from 'react-mobile-cropper';
import 'react-mobile-cropper/dist/style.css'

interface PropsData {
    initRatio?: number
    src: string
    setSrc: (src: string) => void
    payload: any,
    setPayload: (data: any) => void
}

const ImageCropper = ({ initRatio, src, setSrc, payload, setPayload }: PropsData) => {
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

    const onChange = (cropper: CropperRef) => {
        setPayload((preData: any) => { return { ...preData, canvas: cropperRef.current.getCanvas() } });
    };

    if (!image) return <img src={src} className='w-full h-auto'></img>

    return (
        <Cropper
            ref={cropperRef}
            src={src}
            onChange={onChange}
            stencilProps={{
                aspectRatio: ratio || {
                    minimum: 1 / 16,
                    maximum: 16 / 1,
                },

                movable: false,
                resizable: true
            }}
        />
    )
};

export default ImageCropper;