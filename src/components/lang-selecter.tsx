/**
 * @fileoverview 语言选择器组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了语言选择器组件，用于选择语言。
 *          该组件提供以下功能：
 *          - 显示语言选择下拉框
 *          - 支持语言选择
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/select 模块获取选择框组件
 */
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