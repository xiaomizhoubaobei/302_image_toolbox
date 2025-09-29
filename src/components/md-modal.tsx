import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import MdContent from "./md-content"
import { FaBookReader } from "react-icons/fa";
import Locale from "@/locales";


interface PropsData {
  trigger: any
  content: string
  confirm: () => void
}

export function MdModal({ trigger, content, confirm }: PropsData) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild ref={trigger}>
        <Button disabled={!content} variant="default" size={"sm"} >
          <FaBookReader />
          <span className="px-1">{Locale.Photo.MdModel.Action}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{Locale.Photo.MdModel.Title}</AlertDialogTitle>
          <AlertDialogDescription>
            {Locale.Photo.MdModel.Desc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <MdContent content={content} />
        <AlertDialogFooter>
          <AlertDialogCancel>{Locale.Photo.MdModel.No}</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>{Locale.Photo.MdModel.Yes}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
