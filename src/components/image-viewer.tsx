import Image from 'next/image'

interface PropsData {
  src: string
  setSrc: (src: string) => void
}

export function ImageViewer({ src, setSrc }: PropsData) {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-white/90 flex flex-col justify-center items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="show">
        <Image style={{ maxWidth: '100%', height: 'auto' }} src={src} alt="图片查看器" width={800} height={600} unoptimized />
      </div>
      <div className="action" onClick={() => setSrc('')}>close</div>
    </div>
  );
}
