/**
 * @fileoverview 语言菜单组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了语言菜单组件，用于切换应用语言。
 *          该组件提供以下功能：
 *          - 显示语言选择菜单
 *          - 支持语言切换
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/dropdown-menu 模块获取下拉菜单组件
 *          - 依赖 @/locales 获取国际化文本和语言选项
 */
"use client"

import * as React from "react"
import { IoLanguageSharp } from "react-icons/io5";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Locale, { changeLang, ALL_LANG_OPTIONS } from "@/locales"



export function LangMenu() {
  const [lang, setLang] = React.useState("zh")

  React.useEffect(() => {
    setLang(Locale.Symbol)
  }, [])

  const handlerChangeLang = (value: string) => {
    setLang(value)
    changeLang(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="cursor-pointer">
          <IoLanguageSharp className="text-slate-500 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 hover:text-primary hover:scale-110" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-12 ">
        <DropdownMenuLabel className="hidden"></DropdownMenuLabel>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuRadioGroup value={lang} onValueChange={handlerChangeLang}>
          {
            ALL_LANG_OPTIONS.map((it) => (
              <DropdownMenuRadioItem key={it.value} value={it.value}>{it.label}</DropdownMenuRadioItem>
            ))
          }
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}