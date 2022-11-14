import { useSignal, signal, effect, computed } from '@preact/signals'
import { initial, MathProblem } from '../helpers/smartMathGuy.ts'
import Animations from './Animations.ts'

export const Number1MultiplyBy = signal(1)
export const Step = signal(0)
export const MenuOpen = signal(false)

export const CurrentMathProblem = computed(() => {
  console.log(Step.value)
  return initial( Number1MultiplyBy.value )
})

export const CurrentAnimation = computed(() => {
  const animation = Animations[ Step.value ] || Animations[0]
  console.log( Step.value, animation )
  return animation
})