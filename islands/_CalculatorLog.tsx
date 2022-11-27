import { CurrentStack, AllStacks, CurrentValue } from '../data/Calculations.ts';

export default e => {

  return (
    <>
      <div class="log">
        {AllStacks.value.map((item, index) => {
          console.log(item)
          return (
            <div key={index}>
              {item.join("")}
            </div>
          )
        })}
      </div>
    </>
  )

}
