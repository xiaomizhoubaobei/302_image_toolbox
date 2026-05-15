import React from 'react'
import { Input } from "@/components/ui/input"
import Locale from "@/locales";

interface PromptBarProps {
  payload: any
  setPayload: (data: any) => void
  placeHolder?: string
}

function PromptBar({ payload, setPayload, placeHolder }: PromptBarProps) {

  const handleInputChange = ({ target }: any) => {
    setPayload((preData: any) => { return { ...preData, prompt: target.value } });
  }

  return (
    <div className='w-full flex justify-center px-1 md:px-0'>
      <Input
        value={payload.prompt}
        type="text"
        placeholder={placeHolder ? placeHolder : Locale.System.PromptPlaceholder}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default PromptBar