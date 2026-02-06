/**
 * @fileoverview 模型选择器组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了模型选择器组件，用于选择 AI 模型。
 *          该组件提供以下功能：
 *          - 显示模型选择下拉框
 *          - 支持模型选择
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/select 模块获取选择框组件
 *          - 依赖 @/locales 获取模型列表和国际化文本
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
import Locale from "@/locales";

// 从国际化配置获取模型列表
const MODEL_LIST = Locale.Photo.ImageModels.List

interface PropsData {
  model: any
  setModel: (model: any) => void
}


export function ModelSelecter({model, setModel}: PropsData) {
  const handleChangeModel = (value: any) => {
    const foundModel = MODEL_LIST.find(it => it.value === value)
    setModel(foundModel)
  }

  return (
    <Select value={model.value} onValueChange={handleChangeModel}>
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder={Locale.Photo.ImageModels.Desc} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>{Locale.Photo.ImageModels.Title}</SelectLabel>
          {
            MODEL_LIST.map((it) => {
              return <SelectItem key={it.value} value={it.value}>{it.name}</SelectItem>
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}