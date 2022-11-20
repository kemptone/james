import { useSignal, signal, effect, computed } from '@preact/signals'
// import { initial, MathProblem } from '../helpers/smartMathGuy.ts'
import Animations from './Animations.ts'

export interface MathProblem {
  num1: number;
  num2: number;
  answer: number;
  answerDivide: number;
  answerMultiply: number;
}

export function divdeBigNumber(p: {
  num1?: number
  , num2?: number
  , isNum2DerivedFromNum1: boolean
  , num1MultiplyBy?: number
  , num2MultiplyBy?: number
  , num1IsRandom?: boolean
}): MathProblem {

  const rand1 = Math.ceil(Math.random() * 10)
  const rand2 = Math.ceil(Math.random() * 10)

  const num1 = p.num1IsRandom ? Math.floor(rand1 * (p.num1MultiplyBy || 10)) : p.num1 || 1
  const num2 = p.isNum2DerivedFromNum1 ? num1 * Math.floor(rand2 * (p.num2MultiplyBy || 10)) : p.num2 || 1

  return {
    num1: num2
    , num2: num1
    , answer: (num2 / num1)
    , answerDivide: (num2 / num1)
    , answerMultiply: (num2 * num1)
  }
}

export const Number1MultiplyBy = signal(1)
export const Number2MultiplyBy = signal(10)
export const Number1IsRandom = signal(true)
export const IsNum2DerivedFromNum1 = signal(true)
export const Step = signal(0)
export const MenuOpen = signal(false)

export const CurrentMathProblem = computed(() => {
  return divdeBigNumber({
    num1MultiplyBy: Number1MultiplyBy.value
    , isNum2DerivedFromNum1: IsNum2DerivedFromNum1.value
    , num1IsRandom: Number1IsRandom.value
  })
})

export const CurrentAnimation = computed(() => {
  const animation = Animations[Step.value] || Animations[0]
  console.log(Step.value, animation)
  return animation
})