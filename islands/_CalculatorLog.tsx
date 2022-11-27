import { CurrentStack, AllStacks, CurrentValue } from '../data/Calculations.ts';
import { SmartJoin } from './_CalculatorValues.tsx'

export default e => {

  return (
    <>
      <div class="log">
        {AllStacks.value.map((item, index) => {
          return (
            <div key={index}>
              {SmartJoin(item)}
            </div>
          )
        })}
      </div>
    </>
  )

}
