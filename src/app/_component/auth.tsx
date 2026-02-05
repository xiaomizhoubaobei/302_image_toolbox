/**
 * @fileoverview 页面认证对话框组件
 * @author 祁筱欣
 * @date 2026-02-05
 * @since 2026-02-05
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了用户 API 密钥认证功能，通过对话框形式让用户输入认证凭证。
 *          该组件作为客户端组件运行，负责以下任务：
 *          - 检测环境变量中的 API 密钥配置
 *          - 在本地存储中管理用户认证令牌
 *          - 提供用户界面让用户手动输入 API 密钥
 *          - 验证并保存用户提交的认证信息
 *
 *          工作流程：
 *          1. 组件挂载时检查环境变量和本地存储中的令牌
 *          2. 如果环境变量配置了 API 密钥，自动使用该密钥
 *          3. 如果未找到有效令牌，自动打开认证对话框
 *          4. 用户提交表单后验证并保存 API 密钥
 *          5. 认证成功后关闭对话框
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/* 模块获取 UI 组件
 *          - 依赖 @/stores 模块进行状态管理
 *          - 依赖 @/locales 模块获取国际化文本
 */
"use client"
import React from 'react'
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useStore } from "@/stores";
import Locale from '@/locales'

type PageAuthProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

/**
 * 页面认证对话框组件
 * 用于处理用户 API 密钥认证的对话框界面
 * @param props - 组件属性
 * @param props.open - 对话框是否打开
 * @param props.setOpen - 设置对话框打开状态的回调函数
 */
const PageAuth = ({ open, setOpen }: PageAuthProps) => {
  const { token, setToken } = useStore();
  const apiKeyFromEnv = process.env.NEXT_PUBLIC_API_KEY || token;

  React.useEffect(() => {
    if (window) {
      if (apiKeyFromEnv) {
        setToken(apiKeyFromEnv);
      } else if (!token) {
        setOpen(true);
      }
    }
  }, [apiKeyFromEnv, setToken, setOpen, token]);

  /**
   * 处理 API 密钥表单提交
   * 从表单中提取用户输入的 API 密钥，验证后保存到状态管理中，并关闭对话框
   * @param event - 表单提交事件对象
   */
  const handleApiKeySubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const inputApiKey = formData.get('apiKey');
    if (inputApiKey) {
      setToken(inputApiKey as string);
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogTitle className=''>{Locale.Auth.NeedCode}</DialogTitle>
          <DialogDescription className="text-sm text-slate-500">{Locale.Auth.InputCode}</DialogDescription>
          <form className="flex gap-2" onSubmit={handleApiKeySubmit}>
            <div className="w-full ">
              <label className='text-sm text-slate-500' htmlFor="apiKey"></label>
              <Input id="apiKey" name="apiKey" placeholder={Locale.Auth.PlaceHolder} required />
            </div>
            <DialogFooter>
              <Button type="submit">{Locale.Auth.Submit}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PageAuth