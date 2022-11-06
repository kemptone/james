import { Button } from "./Button.tsx";

export default ({ 
  setStep
  , setMultiplyBy
  , number1MultiplyBy
  , step
}) => {
  
  const nextProblem = () => {
    setStep( step + 1 )
  }
  
  const factorPlus = () => {
    setMultiplyBy( number1MultiplyBy + 1 )
    setStep( step + 1 )
  }
  
  const factorMinus = () => {
    setMultiplyBy( number1MultiplyBy - 1 )
    setStep( step + 1 )
  }
  
  const makeEasier = () => {
    setMultiplyBy( number1MultiplyBy / 10 )
    setStep( step + 1 )
  }

  const makeHarder = () => {
    setMultiplyBy( number1MultiplyBy * 10 )
    setStep( step + 1 )
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