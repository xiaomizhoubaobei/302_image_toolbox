"use client";

import React from "react";
import Image from "next/image";
import { useStore } from "@/stores";
import Locale from "@/locales"

export function Footer() {
  const [isClient, setIsClient] = React.useState(false)
  const { domain } = useStore();

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <footer className="w-full flex fixed bottom-0 right-0 p-1 z-20 bg-background/95">
      <div className="flex flex-col items-center justify-center p-0 w-full">
        <div className="flex z-50">
          <a href={domain} target="_blank" className="flex p-1 space-x-2" style={{ textDecoration: "none" }}>
            <div className="title text-xs text-[#666]">
              Powered By
            </div>
            <div className="banner flex items-center">
              <Image width={50} height={14} src="https://img.mizhoubaobei.top/302AI/302_image_toolbox/banner.png" alt="" />
            </div>
          </a>
        </div>
        <div className="flex justify-center text-center text-xs text-gray-400 ">
          {Locale.Footer.Title}
        </div>
      </div>
    </footer>
  );
}
