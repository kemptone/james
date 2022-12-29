import { Problem } from "../components/Problem.tsx"
import { Head } from "$fresh/runtime.ts"
import { Number1MultiplyBy, Number2MultiplyBy, MenuOpen, CurrentMathProblem, Step } from '../data/State.ts'
import { Logo, LogoBottom } from "../components/Logos.jsx"

export default function NumberGame() {

  return (
    <div>

      <Head>
        <title>Number Deno Dev</title>
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      </Head>

      <div>
        <span className="animation top">
          <Logo />
        </span>
        <span className="animation bottom">
          <LogoBottom />
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
        <span id="divisible">
          [ {Number2MultiplyBy.value} ]
          [ {Number1MultiplyBy.value} ]
        </span>
      </div>

    </div>
  )
}