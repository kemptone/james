import { useSignal, signal, effect } from '@preact/signals'
import { initial, MathProblem } from '../helpers/smartMathGuy.ts'

export const Number1MultiplyBy = signal(1)
export const CurrentMathProblem = signal(initial(1))
export const Step = signal(0)
export const MenuOpen = signal(false)