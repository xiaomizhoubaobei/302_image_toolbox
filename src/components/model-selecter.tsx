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

const MODEL_LIST = Locale.Photo.ImageModels.List

interface PropsData {
  model: any
  setModel: (model: any) => void
}


export function ModelSelecter({model, setModel}: PropsData) {
  const [models, setModels] = React.useState(MODEL_LIST)

  const handleChangeModel = (value: any) => {
    const model = models.find(it => it.value === value)
    setModel(model)
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
            models.map((it) => {
              return <SelectItem key={it.value} value={it.value}>{it.name}</SelectItem>
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
