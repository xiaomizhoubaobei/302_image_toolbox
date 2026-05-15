"use client"

import * as React from "react"
import { IoLanguageSharp } from "react-icons/io5";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
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
