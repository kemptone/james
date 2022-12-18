import { CurrentStack, AllStacks, CurrentValue } from '../data/Calculations.ts';
import { SmartJoin } from './CalculatorValues.tsx'

export default e => {

  return (
    <>
      <div class="log">
        <div>
          **** WARNING *** demo only, CALCULATOR IS NOT ACCURATE WITH DECIMAL
        </div>
        <div>
          **** PROBABLY OTHER BUGS AS WELL **** DO NOT USE FOR REAL NUMBERS
        </div>
        {AllStacks?.value?.map?.((item, index) => {
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
