import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Lang = {
  name: string,
  value: string,
}

interface PropsData {
  title: string
  langs: Lang[]
  lang: string
  setLang: (data: any) => void
}


export default function LangSelecter({ title, langs, lang, setLang }: PropsData) {

  const handleChangeModel = (value: any) => {
    setLang(value)
  }

  return (
    <Select value={lang} onValueChange={handleChangeModel}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder={title} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {
            langs.map((lang) => {
              return <SelectItem key={lang.value} value={lang.value}>{lang.name}</SelectItem>
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
