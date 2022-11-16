import { Problem } from "../components/Problem.tsx";
import { Head } from "$fresh/runtime.ts";
import { Number1MultiplyBy, MenuOpen, CurrentMathProblem, Step, CurrentAnimation } from '../data/State.ts'
import Animations from '../data/Animations.ts'
import Dialog from '../components/Dialog.tsx'
import { useState } from 'preact/hooks'

const animationSource = Animations[0]

export default function NumberGame() {

  {/* @ts-expect-error: dugh */ }
  const $logo = (
    <lottie-player
      src={CurrentAnimation.value}
      key={CurrentAnimation.value}
      background="transparent"
      speed=".25"
      style="width: 300px; height: 300px;" loop autoplay
    />
  )

  const $logoBottom = (
    <lottie-player
      // src={ animations[0] }
      src={CurrentAnimation.value}
      key={CurrentAnimation.value}
      background="transparent"
      speed=".25"
      style="width: 200px; height: 200px;" loop autoplay
    />
  )

  return (
    <div>
      <Head>
        <title>Number Deno Dev</title>
        <link rel="stylesheet" href="style.css" />
        <link rel="stylesheet" href="dialog.css" />
        <link rel="stylesheet" href="menu.css" />
        <link rel="stylesheet" href="fonts.css" />
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      </Head>


      <div>
        <span className="animation top">
          {$logo}
        </span>
        <span className="animation bottom">
          {$logoBottom}
        </span>
        <section class="math-problems">
          <Problem
            {...CurrentMathProblem.value}
            step={Step.value}
            onSubmit={() => Step.value += 1}
            act="÷"
            onFocus={e => {
              MenuOpen.value = false
            }}
          />
        </section>
        <span id="divisible">{Number1MultiplyBy.value}</span>
      </div>

    </div>
  );
}