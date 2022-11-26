import { CurrentStack, CurrentValue } from '../data/Calculations.ts';

export default e => {

  return (
    <>
      <div class="i">
        <div>{CurrentValue.value.join("") || 0}</div>
        <div class="i2">{CurrentStack.value.join("") || 0}</div>
      </div>
    </>
  )

}
