import { useState, useEffect } from "preact/hooks";
import { Problem } from "../components/Problem.tsx";
import { initial } from "../helpers/smartMathGuy.ts";
import Menu from './Menu.jsx'
import NumberGameActions from '../components/numberGame.actions.jsx'

export default function NumberGame() {

  const [ number1MultiplyBy, setMultiplyBy ] = useState(100);
  const [ problem, setProblem ] = useState( initial(number1MultiplyBy) );
  const [ step, setStep ] = useState(0);

  useEffect(() => {
    setProblem(initial(number1MultiplyBy))
  }, [ step ])
  
  return (
        <section class="math-problems">
          <Menu>
            { M => (
              <header>
                { M.$menu }
                { M.$nav }
              </header>
            )}
          </Menu>
          <NumberGameActions 
            { ...{
              setStep
              , setMultiplyBy
              , number1MultiplyBy
              , step
            }}
          />
          <Problem { ...problem } act="÷" />
        </section>
  );
}