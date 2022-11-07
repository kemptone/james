import { useState, useEffect } from "preact/hooks";
import { Problem } from "../components/Problem.tsx";
import { initial } from "../helpers/smartMathGuy.ts";
import Menu from './Menu.jsx'
import NumberGameActions from '../components/numberGame.actions.jsx'
import { Head } from "$fresh/runtime.ts";
import Lottie from "../components/Lottie.jsx";

export default function NumberGame() {

  const [ number1MultiplyBy, setMultiplyBy ] = useState(1);
  const [ problem, setProblem ] = useState( initial(number1MultiplyBy) );
  const [ step, setStep ] = useState(0);

  useEffect(() => {
    setProblem(initial(number1MultiplyBy))
  }, [ step ])
  
  return (
    <div>
      <Head>
        <title>🂻 Number Games</title>
        <link rel="stylesheet" href="style.css" />
        <link rel="stylesheet" href="menu.css" />
        <link rel="stylesheet" href="fonts.css" />
      </Head>
      <Menu>
        { M => (
          <header>
            { M.$menu }
            <nav className={ `navigation${ M.isOpen ? " open" : "" }` }>
                { M.$links }
                <NumberGameActions 
                  { ...{
                    setStep
                    , setMultiplyBy
                    , number1MultiplyBy
                    , step
                  }}
                />
            </nav>
          </header>
        )}
      </Menu>
    <section class="math-problems">
      <Problem { ...problem } step={ step } onSubmit={ () => setStep( step + 1 )} act="÷" />
    </section>
      <span id="divisible">{ number1MultiplyBy }</span>
      <Lottie
        src="https://assets5.lottiefiles.com/datafiles/zc3XRzudyWE36ZBJr7PIkkqq0PFIrIBgp4ojqShI/newAnimation.json"  
        background="transparent"  
        speed="1"  
        style="width: 300px; height: 300px"
      />
    </div>
  );
}