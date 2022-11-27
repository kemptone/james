import { useSignal, signal, effect, computed } from '@preact/signals'

// [[ "2", "1", "x", "5", "=" ], [ "105" ]]
export const AllStacks = signal([])

// [ "2", "1", "x", "5" ]
export const CurrentStack = signal([])

// "0"
export const CurrentValue = computed(() => {

  const normalized = [""]

  CurrentStack.value.forEach(item => {
    if (Number.isInteger(Number.parseInt(item)))
      normalized[normalized.length - 1] += item
    else
      normalized.push(item, "")
  })

  let a = 0
  let operand = "+"

  let doToNumber = (number) => {
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
export const AllStack = signal([])
