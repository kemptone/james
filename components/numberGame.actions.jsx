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
      <div className="actions">
        <Button onClick={ makeEasier }>Easier ÷ 10</Button>
        <Button onClick={ makeHarder }>harder × 10</Button>
        <Button onClick={ factorMinus }>factor - 1</Button>
        <Button onClick={ factorPlus }>factor + 1</Button>
      </div>
    )

}