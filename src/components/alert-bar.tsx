import React, { useState } from 'react'
import { MdErrorOutline } from "react-icons/md";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useStore } from '@/stores';
import Locale from '@/locales'

interface PropsData {
  errInfo: any
}

function AlertBar({ errInfo }: PropsData) {
  const { domain } = useStore()
  const [errType, setErrType] = useState('')
  const [errContent, setErrorContent] = useState('')

  React.useEffect(() => {
    let showContent = JSON.stringify(errInfo)
    if (errInfo?.error && errInfo.error.err_code) {
      // todo
      setErrType(Locale.Error.Title)
      if (showContent.includes('-10001')) {
        showContent = Locale.Error.TokenMiss(domain)
      }
      if (showContent.includes('-10002')) {
        showContent = Locale.Error.TokenInvalid(domain)
      }
      if (showContent.includes('-10003')) {
        showContent = Locale.Error.InternalError(domain)
      }
      if (showContent.includes('-10004')) {
        showContent = Locale.Error.AccountOut(domain)
      }
      if (showContent.includes('-10005')) {
        showContent = Locale.Error.TokenExpired(domain)
      }
      if (showContent.includes('-10006')) {
        showContent = Locale.Error.TotalOut(domain)
      }
      if (showContent.includes('-10007')) {
        showContent = Locale.Error.TodayOut(domain)
      }
      if (showContent.includes('-10012')) {
        showContent = Locale.Error.HourOut(domain)
      }

    } else {
      setErrType(Locale.Error.Title)
    }
    setErrorContent(showContent)
  }, [errInfo, domain])

  return (
    <Alert variant="destructive">
      <MdErrorOutline className="h-4 w-4" />
      <AlertTitle className='text-md'>{errType}</AlertTitle>
      <AlertDescription className="text-sm ">
        {errContent.split(" ").map((word, index) => {
          const urlPattern = /(https?:\/\/[^\s]+)/g;
          if (urlPattern.test(word)) {
            return (
              <span
                key={index}
              >
                <a
                  href={word}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-primary"
                >
                  {/* {word} */}
                  {'302.AI'}
                </a>
                {" "}
              </span>
            );
          }
          return word + " ";
        })}
      </AlertDescription>
    </Alert>
  )
}

export default AlertBar