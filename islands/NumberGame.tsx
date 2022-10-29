import { useState, useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { Problem } from "../components/Problem.tsx";

function randomInputs (num1Power = 100, num2Power = 100, divisibleBy = 1, force2 = 0) {
  const num1 = divisibleBy * Math.floor( Math.random() * num1Power )
  const num2 = Math.floor( Math.random() * num2Power )
  return {
    num1
    , num2 : force2 || num2
  }
}

const initial = () => randomInputs(100, 100)

export default function NumberGame() {

  const [ problem, setProblem ] = useState( initial() );
  const [ step, setStep ] = useState(0);

  useEffect(() => {
    setProblem(initial())
  }, [ step ])

  return (
    <>
      <Problem { ...problem } act="÷" />
      <Button onClick={ e => setStep( step + 1 )}>Next</Button>
    </>
  );
}