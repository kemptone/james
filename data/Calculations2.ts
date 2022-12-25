import { signal, effect, computed } from '@preact/signals'
import LS from '../helpers/localStorage.js'

const { populate, persist } = LS("Calculations2")

export const CurrentCalc = signal( populate("CurrentCalc") ?? "0" )
export const Log = signal( populate("Log") ?? ["0"] )



effect(() => {
  persist("CurrentCalc", CurrentCalc.value)
  persist("Log", Log.value)
})