import { CurrentStack, CurrentValue, AllStacks } from '../data/Calculations.ts';

export default e => {

  let thing = e.currentTarget.innerText

  switch (thing) {

    case "C": {
      CurrentStack.value = []
      return
    }

    case "⌫": {
      let most = CurrentStack.value.slice(0, CurrentStack.value.length - 1)
      CurrentStack.value = most
      return
    }

    case "⏾":
      return

    case "=": {
      let normalized = [""]
      let values = CurrentStack.value

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

      AllStacks.value = [...AllStacks.value, [...CurrentStack.value, "=", a]]
      CurrentStack.value = [a, "END"]
      return
    }

  }

  if (CurrentStack.value[CurrentStack.value.length - 1] === "END") {
    if (Number.isInteger(Number.parseInt(thing)))
      return CurrentStack.value = [thing]
  }

  CurrentStack.value = [...CurrentStack.value, thing]

}
