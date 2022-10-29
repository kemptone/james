import { useState, useEffect } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface MathProblem {
  num1 : number
  , num2 : number
  , act? : string
  , equals? : string
}

const Problem = (props: MathProblem) => {

  const {
    num1 = 0
    , num2 = 0
    , act = "÷"
    , equals = "="
  } = props


  return (
    <div class="problem">
      <span class="num1">{num1}</span>
      <span class="act">{act}</span>
      <span class="num2">{num2}</span>
      <span class="equals">{equals}</span>
      <input type="number" name="answer1" />
    </div>
  );
};

function randomInputs (num1Power = 100, num2Power = 100, divisibleBy = 1, force2 = 0) {
  const num1 = divisibleBy * Math.floor( Math.random() * num1Power )
  const num2 = Math.floor( Math.random() * num2Power )
  return {
    num1
    , num2 : force2 || num2
  }
}

export default function NumberGame() {

  // const list = buildList(5, 100, 100, 125, 125)
  const [ problem, setProblem ] = useState(
    randomInputs(100, 100, 125)
  );
  const [ step, setStep ] = useState(0);

  useEffect(() => {
    setProblem(randomInputs(100, 100, 125))
  }, [ step ])

  return (
    <>
      <section class="math-problems">
        <Problem { ...problem } act="÷" />
        <Button onClick={ e => setStep( step + 1 )}>Next</Button>
      </section>
    </>
  );
}