import { signal, effect, computed } from '@preact/signals'
import LS from '../helpers/localStorage.js'

const { populate, persist } = LS("Calculations2")

export const MainNumber = computed(() => {
  let str = CurrentCalc.value ?? ""
  str = str.replace("®", "")
  const [ main, second, ...others ] = str.split(/[÷×\+\-]/g).reverse()
  return main || second
})

export const LogLine = computed(() => {
  let str = CurrentCalc.value ?? ""

  console.log({ 
    str 
    , index : str.indexOf("®")
  })

  if (str.indexOf("®") === str.length - 1)
    return Log.value[ Log.value.length - 1 ]

  str = str.replace("®", "")
  return str
})

export const CurrentCalc = signal( populate("CurrentCalc") ?? "0" )
export const Log = signal( populate("Log") ?? ["0"] )

effect(() => {
  persist("CurrentCalc", CurrentCalc.value)
  persist("Log", Log.value)

  const str = CurrentCalc.value
  console.log({ str })

})