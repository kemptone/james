import { CurrentStack, CurrentValue } from '../data/Calculations.ts';

export function SmartJoin(values) {
  let things = []
  let str = ""
  values.forEach(item => {
    if (item !== "END")
      things.push(item)
    // if (!Number.isInteger(Number.parseInt(item)))
    //   things.push(` ${item} `)

  })

  things.forEach(th => {
    if (!Number.isInteger(Number.parseInt(th)))
      str += ` ${th} `
    else
      str += th

  })

  return str
}

export default e => {

  return (
    <>
      <div class="i">
        <div>{CurrentValue.value || 0}</div>
        <div class="i2">{SmartJoin(CurrentStack.value) || 0}</div>
      </div>
    </>
  )

}
