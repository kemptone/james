import { Button } from "./Button.tsx";
import { Number1MultiplyBy, Number2MultiplyBy, CurrentMathProblem, Step } from '../data/State.ts'
import Dialog from '../components/Dialog.tsx'

export default () => {

  const factorPlus = (val, Num) => () => {
    Num.value += val
    Step.value++
  }

  const makeHarderBy = (by, Num) => () => {
    Num.value *= by
    Step.value++
  }

  return (
    <Dialog>
      {D => (
        <>
          <dfl>
            <dt>SIZE A</dt>
            <dd>
              <button onClick={makeHarderBy(.1, Number1MultiplyBy)}>÷ 10</button>
              <button onClick={makeHarderBy(10, Number1MultiplyBy)}>× 10</button>
              <button onClick={factorPlus(-1, Number1MultiplyBy)}>- 1</button>
              <button onClick={factorPlus(1, Number1MultiplyBy)}>+ 1</button>
            </dd>
            <dt>SIZE B</dt>
            <dd>
              <button onClick={makeHarderBy(.1, Number2MultiplyBy)}>÷ 10</button>
              <button onClick={makeHarderBy(10, Number2MultiplyBy)}>× 10</button>
              <button onClick={factorPlus(-1, Number2MultiplyBy)}>- 1</button>
              <button onClick={factorPlus(1, Number2MultiplyBy)}>+ 1</button>
            </dd>
            <dt>STEP</dt>
            <dd><button onClick={e => Step.value++}>+ 1</button></dd>
            <dt>
              <a onClick={D.openDialog}>more settings</a>
            </dt>
          </dfl>
          <D.Dialog ref={D.ref}>
            <form onSubmit={e => {
              e.preventDefault()
            }}>
            </form>
          </D.Dialog>
        </>
      )}
    </Dialog>
  )

}