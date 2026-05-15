'use client'
import ImageManager from "@/utils/Image";
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Image as Img, Transformer, } from "react-konva";

interface ImageEditorProps {
  src: string
  setSrc: (src: string) => void
  payload: any,
  setPayload: (data: any) => void
}

const ImageStitching: React.FC<ImageEditorProps> = ({ src, setSrc, payload, setPayload }) => {
  const containerRef = useRef<any>(null);
  const stageRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  // 1
  const imageRef1 = useRef<any>(null);
  const trRef1 = useRef<any>(null);
  // 2
  const imageRef2 = useRef<any>(null);
  const trRef2 = useRef<any>(null);
  // 3
  const imageRef3 = useRef<any>(null);
  const trRef3 = useRef<any>(null);
  // 4
  const imageRef4 = useRef<any>(null);
  const trRef4 = useRef<any>(null);
  // 5
  const imageRef5 = useRef<any>(null);
  const trRef5 = useRef<any>(null);


  const [scale, setScale] = useState(0.2);
  const [rotation, setRotation] = useState(0);
  const [imageDrag, setImageDrag] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [image, setImage] = useState<HTMLImageElement | null>(null)


  const handleTransform = () => {
    if (trRef.current && imageRef.current) {
      trRef.current.setNode(imageRef.current);
      trRef.current.getLayer()?.batchDraw();
    }
  };

  // 1
  const handleTransform1 = () => {
    if (trRef1.current && imageRef1.current) {
      trRef1.current.setNode(imageRef1.current);
      trRef1.current.getLayer()?.batchDraw();
    }
  };
  // 2
  const handleTransform2 = () => {
    if (trRef2.current && imageRef2.current) {
      trRef2.current.setNode(imageRef2.current);
      trRef2.current.getLayer()?.batchDraw();
    }
  };
  // 3
  const handleTransform3 = () => {
    if (trRef3.current && imageRef3.current) {
      trRef3.current.setNode(imageRef3.current);
      trRef3.current.getLayer()?.batchDraw();
    }
  };
  // 4
  const handleTransform4 = () => {
    if (trRef4.current && imageRef4.current) {
      trRef4.current.setNode(imageRef4.current);
      trRef4.current.getLayer()?.batchDraw();
    }
  };
  // 5
  const handleTransform5 = () => {
    if (trRef5.current && imageRef4.current) {
      trRef5.current.setNode(imageRef4.current);
      trRef5.current.getLayer()?.batchDraw();
    }
  };

  // resize
  useEffect(() => {
    setContainerWidth(10)
    const handleResize = () => {
      if (containerRef.current && payload.ratio) {
        setTimeout(() => {
          const newWidth = containerRef.current.offsetWidth
          setContainerWidth(newWidth);
          if (image?.width) {
            const conWidth = Number(newWidth)
            const imgWidth = Number(image.width)
            const imgScale = (conWidth - 200) / imgWidth
            setScale(imgScale)
            handleTransform()
            handleActionDone()
          }
        }, 30)
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // 初始化时获取容器宽度

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [image, payload.ratio]);

  useEffect(() => {
    handleActionDone()
  }, [payload.images])



  useEffect(() => {
    // hook
    const img = new Image()
    img.onload = () => {
      setImage(img)
      if (img) {
        const ratio = img.width / img.height
        setPayload((preData: any) => { return { ...preData, ratio } });
      }
    }
    img.src = src
  }, [src])


  const handleActionDone = async () => {
    if (!stageRef.current) return
    setImageDrag(false)
    setTimeout(async () => {
      const local = stageRef.current.toDataURL({ pixelRatio: 2 });
      setPayload((preData: any) => { return { ...preData, mask: local } });
      setImageDrag(true)
      await ImageManager.loadImage(local)
    }, 30)
  }


  if (!image) return null

  return (
    <div ref={containerRef}
      id="image-stitching"
      className="w-full h-full overflow-hidden"
      // onMouseEnter={() => setImageDrag(true)}
      onMouseUp={() => handleActionDone()}
      onTouchEnd={() => handleActionDone()}
    >
      <div className=" w-full relative overflow-hidden bg-white border-[1px] border-solid border-[rgba(222,222,222,1)] shadow-sm">
        {payload.ratio &&
          <Stage
            ref={stageRef}
            width={Math.floor(containerWidth)}
            height={Math.floor(containerWidth / payload.ratio)}
            className="w-full"
          >

            <Layer>
              <Rect
                width={Math.floor(containerWidth)}
                height={Math.floor(containerWidth / payload.ratio)}
                fill="#ffffff"
              />
            </Layer>

            <Layer>
              <Img
                image={image}
                ref={imageRef}
                draggable
                rotation={rotation}
                scaleX={scale}
                scaleY={scale}
                onDragEnd={handleTransform}
                onTransformEnd={handleTransform}
                x={100}
                y={50}
                align="center"
              />
              <Transformer ref={trRef} visible={imageDrag} />
            </Layer>

            {/* 1 */}
            {payload.images[0] &&
              <Layer>
                <Img
                  image={payload.images[0]}
                  ref={imageRef1}
                  draggable
                  rotation={rotation}
                  scaleX={scale / 2}
                  scaleY={scale / 2}
                  onDragEnd={handleTransform1}
                  onTransformEnd={handleTransform1}
                  x={50}
                  y={25}
                  align="center"
                />
                <Transformer ref={trRef1} visible={imageDrag} />
              </Layer>
            }
            {/* 2 */}
            {payload.images[1] &&
              <Layer>
                <Img
                  image={payload.images[1]}
                  ref={imageRef2}
                  draggable
                  rotation={rotation}
                  scaleX={scale / 2}
                  scaleY={scale / 2}
                  onDragEnd={handleTransform2}
                  onTransformEnd={handleTransform2}
                  x={60}
                  y={30}
                  align="center"
                />
                <Transformer ref={trRef2} visible={imageDrag} />
              </Layer>
            }
            {/* 3 */}
            {payload.images[2] &&
              <Layer>
                <Img
                  image={payload.images[2]}
                  ref={imageRef3}
                  draggable
                  rotation={rotation}
                  scaleX={scale / 2}
                  scaleY={scale / 2}
                  onDragEnd={handleTransform3}
                  onTransformEnd={handleTransform3}
                  x={70}
                  y={35}
                  align="center"
                />
                <Transformer ref={trRef3} visible={imageDrag} />
              </Layer>
            }
            {/* 4 */}
            {payload.images[3] &&
              <Layer>
                <Img
                  image={payload.images[3]}
                  ref={imageRef4}
                  draggable
                  rotation={rotation}
                  scaleX={scale / 2}
                  scaleY={scale / 2}
                  onDragEnd={handleTransform4}
                  onTransformEnd={handleTransform4}
                  x={80}
                  y={40}
                  align="center"
                />
                <Transformer ref={trRef4} visible={imageDrag} />
              </Layer>
            }
            {/* 5 */}
            {payload.images[4] &&
              <Layer>
                <Img
                  image={payload.images[4]}
                  ref={imageRef5}
                  draggable
                  rotation={rotation}
                  scaleX={scale / 2}
                  scaleY={scale / 2}
                  onDragEnd={handleTransform5}
                  onTransformEnd={handleTransform5}
                  x={90}
                  y={45}
                  align="center"
                />
                <Transformer ref={trRef5} visible={imageDrag} />
              </Layer>
            }



          </Stage>

        }

      </div>
    </div>
  );
};

export default ImageStitching;