// deno-lint-ignore-file no-debugger
import { CurrentCalc, Log } from '../data/Calculations2.ts';

export default (e: { currentTarget: { innerText: string; }; }) => {

  const thing = e.currentTarget.innerText

  switch (thing) {

    case "C": {
      CurrentCalc.value = "0"
      return
    }

    case "⌫": {
      let value = CurrentCalc.value

      if (value.length)
        value = value.substr( 0, value.length - 1 )
      else
        value = "0"

      return CurrentCalc.value = value || "0"
    }

    case "⏾":
      return

    case "=": {
      let replaced = CurrentCalc.value || ""
      replaced = replaced.replaceAll("÷", "/")
      replaced = replaced.replaceAll("×", "*")
      let value = eval( replaced )
      Log.value = [ ...Log.value, CurrentCalc.value + "=" + value]
      return CurrentCalc.value = String(value)
    }

    default : {
      if (CurrentCalc.value === "0")
        CurrentCalc.value = thing
      else
        CurrentCalc.value = CurrentCalc.value += thing
    }

  }

}
