"use client";

import * as React from "react";
import { MdHistory } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HistoryContent } from "./history-content";
import { Tool } from '@/types'
import Locale from "@/locales"

interface PropsData {
  setTool: (tool: Tool) => void
  setFile: (file: File | null) => void
}

export function HistoryModal({ setTool, setFile }: PropsData) {
  const triggerRef = React.useRef(null)
  return (
    <Dialog>
      <DialogTrigger ref={triggerRef}>
        <MdHistory className="text-slate-500 h-[1.6rem] w-[1.6rem] rotate-0 scale-100 hover:text-primary hover:scale-110 " />
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {Locale.History.Title}
          </DialogTitle>
          <DialogDescription className="hidden">
          </DialogDescription>
        </DialogHeader>
        <HistoryContent triggerRef={triggerRef} setTool={setTool} setFile={setFile} />
      </DialogContent>
    </Dialog>
  );
}
