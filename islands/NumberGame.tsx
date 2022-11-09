import { useState, useEffect } from "preact/hooks";
import { Problem } from "../components/Problem.tsx";
import { initial } from "../helpers/smartMathGuy.ts";
import Menu from './Menu.jsx'
import NumberGameActions from '../components/numberGame.actions.jsx'
import { Head } from "$fresh/runtime.ts";
import localStorage from '../helpers/localStorage.js'
import Letters from '../data/Letters.ts'
import Animations from '../data/Animations.ts'

const animationSource = Animations[ 0 ]

export default function NumberGame() {

  const [ number1MultiplyBy, setMultiplyBy ] = useState(1);
  const [ problem, setProblem ] = useState( initial(number1MultiplyBy) );
  const [ step, setStep ] = useState(0);

  useEffect(() => {
    setProblem(initial(number1MultiplyBy))
  }, [ step ])

  {/* @ts-expect-error: dugh */}
  const $logo = (
    <lottie-player 
      // src={ animations[0] }
      src={ animationSource }
      background="transparent"  
      speed=".25"  
      style="width: 300px; height: 300px;"  loop autoplay 
    />
  )

  const $logoBottom = (
    <lottie-player 
      // src={ animations[0] }
      src={ animationSource }
      background="transparent"  
      speed=".25"  
      style="width: 200px; height: 200px;"  loop autoplay 
    />
  )
  
  return (
    <div>
      <Head>
        <title>🂻 Number Games</title>
        <link rel="stylesheet" href="style.css" />
        <link rel="stylesheet" href="menu.css" />
        <link rel="stylesheet" href="fonts.css" />
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      </Head>

      <Menu>
        { M => (
          <div>
            <section class="math-problems">
              <Problem 
                { ...problem } 
                step={ step } 
                onSubmit={ () => setStep( step + 1 )} act="÷" 
                onFocus={ M.close }
              />
            </section>
            <span id="divisible">{ number1MultiplyBy }</span>
            <span className="animation top">
            { $logo }
            </span>
            <span className="animation bottom">
            { $logoBottom }
            </span>

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
            
          </div>
        )}
      </Menu>

    </div>
  );
}