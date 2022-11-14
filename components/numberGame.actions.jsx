import { Button } from "./Button.tsx";
import { Number1MultiplyBy, CurrentMathProblem, Step } from '../data/State.ts'

export default () => {
  
  const nextProblem = () => {
    Step.value++
  }
  
  const factorPlus = () => {
    Number1MultiplyBy.value += 1
    Step.value++
  }
  
  const factorMinus = () => {
    Number1MultiplyBy.value -= 1
    Step.value++
  }
  
  const makeEasier = () => {
    Number1MultiplyBy.value = Number1MultiplyBy.value / 10
    Step.value++
  }

  const makeHarder = () => {
    Number1MultiplyBy.value *= 10
    Step.value++
  }

    return (
      <ul>
        <li><a onClick={ makeEasier }>Smaller ÷ 10</a></li>
        <li><a onClick={ factorMinus }>Smaller - 1</a></li>
        <li><a onClick={ makeHarder }>Bigger × 10</a></li>
        <li><a onClick={ factorPlus }>Bigger + 1</a></li>
        <li><a onClick={ nextProblem }>random</a></li>
      </ul>
    )

}