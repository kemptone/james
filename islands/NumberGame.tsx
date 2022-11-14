import { useState, useEffect } from "preact/hooks";
import { Problem } from "../components/Problem.tsx";
import { initial } from "../helpers/smartMathGuy.ts";
import Menu from './Menu.jsx'
import NumberGameActions from '../components/numberGame.actions.jsx'
import { Head } from "$fresh/runtime.ts";
import localStorage from '../helpers/localStorage.js'
import Letters from '../data/Letters.ts'
import Animations from '../data/Animations.ts'
import { useSignal } from '@preact/signals'
import { Number1MultiplyBy, MenuOpen, CurrentMathProblem, Step } from '../data/State.ts'

const animationSource = Animations[ 0 ]

export default function NumberGame() {

  const number1MultiplyBy = Number1MultiplyBy.value
  const problem = CurrentMathProblem.value
  const setProblem = value => CurrentMathProblem.value = value
  const step = Step.value
  const setStep = step => Step.value = step

  useEffect(() => {
    setProblem(initial(number1MultiplyBy))
  }, [ step ])

  {/* @ts-expect-error: dugh */}
  const $logo = (
    <lottie-player 
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

          <div>
            <section class="math-problems">
              <Problem 
                { ...problem } 
                step={ step } 
                onSubmit={ () => setStep( step + 1 )} act="÷" 
                onFocus={ e => {
                  MenuOpen.value = false
                } }
              />
            </section>
            <span id="divisible">{ number1MultiplyBy }</span>
            <span className="animation top">
            { $logo }
            </span>
            <span className="animation bottom">
            { $logoBottom }
            </span>
            
          </div>

    </div>
  );
}