import { CurrentCalc } from '../data/Calculations2.ts';

export default () => {

  return (
    <>
      <div class="i">
        <div>{CurrentCalc.value ?? 0}</div>
        <div class="i2">{CurrentCalc.value ?? 0}</div>
      </div>
    </>
  )

}
