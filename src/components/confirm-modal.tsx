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

import Locale from "@/locales"

interface PropsData {
  confirm: () => void
}

export function ConfirmModal({confirm}: PropsData) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="border-primary text-primary">{Locale.Photo.BackModel.Action}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{Locale.Photo.BackModel.Title}</AlertDialogTitle>
          <AlertDialogDescription>
            {Locale.Photo.BackModel.Desc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{Locale.Photo.BackModel.No}</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>{Locale.Photo.BackModel.Yes}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
