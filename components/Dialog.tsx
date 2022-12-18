import { JSX } from 'preact'
import { useRef, useEffect, useState } from 'preact/hooks'
import { forwardRef } from 'preact/compat'

const Dialog = forwardRef<HTMLDialogElement>((args:JSX.HTMLAttributes<HTMLDialogElement>, ref) => {
  return (
    <dialog {...args} ref={ref}>
      {args.children}
      <form method="dialog"><button>✕</button></form>
    </dialog>
  )
})

export default (args: JSX.HTMLAttributes<HTMLDialogElement>) => {

  const ref_dialog = useRef<HTMLDialogElement>(null)

  const openDialog = () => {
    ref_dialog?.current?.showModal()
  }

  const closeDialog = () => {
    ref_dialog?.current?.close()
  }

  useEffect(() => {
    ref_dialog?.current?.addEventListener('click', (ev) => {
      if (ev.offsetX < 0 || ev.offsetX > ev.target.offsetWidth ||
        ev.offsetY < 0 || ev.offsetY > ev.target.offsetHeight) {
        closeDialog()
      }
    });
  })

  return args.children({
    Dialog
    , openDialog
    , closeDialog
    , ref: ref_dialog
  })

}