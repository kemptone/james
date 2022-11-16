import { useRef, useEffect, useState } from 'preact/hooks'
import { forwardRef } from 'preact/compat'

const Dialog = forwardRef((args, ref) => {
  return (
    <dialog {...args} ref={ref}>
      <form method="dialog"><button>✕</button></form>
      {args.children}
    </dialog>
  )
})

export default args => {

  const ref_dialog = useRef(undefined)

  const openDialog = e => {
    ref_dialog?.current?.showModal()
  }

  const closeDialog = e => {
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