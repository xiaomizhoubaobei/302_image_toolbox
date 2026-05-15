"use client"
import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useStore } from "@/stores";
import Locale from '@/locales'

type PageAuthProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

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

  const handleApiKeySubmit = (event: React.FormEvent<HTMLFormElement>) => {
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