import { CurrentStack, CurrentValue } from '../data/Calculations.ts';

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
      debugger
      return
    }

  }

  CurrentStack.value = [...CurrentStack.value, thing]

  switch (thing) {
    case "÷":
    case "-":
    case "+":
    case "×":
      return CurrentValue.value = CurrentStack.value
  }

}
