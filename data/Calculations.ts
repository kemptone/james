import { signal, effect, computed } from '@preact/signals'
import _LS from '../helpers/localStorage.js'

const LS = _LS("Calculations")

// [[ "2", "1", "x", "5", "=" ], [ "105" ]]
export const AllStacks = signal( LS.populate("AllStacks") ?? [])

// [ "2", "1", "x", "5" ]
export const CurrentStack = signal(LS.populate("CurrentStack") ?? [])


// "0"
export const CurrentValue = computed(() => {

  const normalized = [""]

  CurrentStack.value.forEach(item => {
    console.log(item)
    if (Number.isInteger(Number.parseInt(item)))
      normalized[normalized.length - 1] += item
    else
      normalized.push(item, "")
  })

  let a = 0
  let operand = "+"

  const doToNumber = (number: number) => {
    switch (operand) {
      case "÷":
        return a = a / number
      case "-":
        return a = a - number
      case "+":
        return a = a + number
      case "×":
        return a = a * number
    }
  }

  normalized.forEach(item => {
    if (Number.isInteger(Number.parseInt(item)))
      doToNumber(Number.parseInt(item))
    else
      operand = item
  })

  if (normalized[normalized.length - 1] !== "")
    return normalized[normalized.length - 1]
  else
    return a

})

// [[ "2", "1", "x", "5" ]]
// export const AllStack = signal(LS.populate("AllStack") ?? [])


effect(() => {
  // console.log({
  //   CurrentStack: CurrentStack.value
  // })
  LS.persist("CurrentStack", CurrentStack.value)
  LS.persist("AllStacks", AllStacks.value)
  if (CurrentValue)
    LS.persist("currentValue", CurrentValue.value)
})