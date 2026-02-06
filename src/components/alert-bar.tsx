/**
 * @fileoverview 警告栏组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了警告栏组件，用于显示错误信息。
 *          该组件提供以下功能：
 *          - 显示错误类型和内容
 *          - 支持错误链接识别
 *          - 根据错误代码提供本地化错误信息
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/alert 模块获取警告组件
 *          - 依赖 @/stores 获取全局状态
 *          - 依赖 @/locales 获取国际化文本
 */
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