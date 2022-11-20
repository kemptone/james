import { Button } from "./Button.tsx";
import { Number1MultiplyBy, CurrentMathProblem, Step } from '../data/State.ts'
import Dialog from '../components/Dialog.tsx'

export default () => {

  const nextProblem = () => {
    Step.value++
  }

  const factorPlus = () => {
    Number1MultiplyBy.value += 1
    Step.value++
  }

  const factorMinus = () => {
    Number1MultiplyBy.value -= 1
    Step.value++
  }

  const makeEasier = () => {
    Number1MultiplyBy.value = Number1MultiplyBy.value / 10
    Step.value++
  }

  const makeHarder = () => {
    Number1MultiplyBy.value *= 10
    Step.value++
  }

  return (
    <Dialog>
      {D => (
        <>
          <dfl>
            <dt>SIZE</dt>
            <dd>( <a onClick={makeEasier}>÷ 10</a> )</dd>
            <dd>( <a onClick={factorMinus}>- 1</a> )</dd>
            <dd>( <a onClick={makeHarder}>× 10</a> )</dd>
            <dd>( <a onClick={factorPlus}>+ 1</a> )</dd>
            <dd>&nbsp;</dd>
            <dt>MORE SETTINGS</dt>
            <dd>
              <a onClick={D.openDialog}>more settings</a>
            </dd>
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