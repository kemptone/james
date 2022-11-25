import { Head } from "$fresh/runtime.ts";
import { CurrentStack, CurrentValue } from '../data/Calculations.ts';

const Action = ({ className, children }) => {
  return (
    <button
      {...{ className, children }}
      onMouseDown={e => {

        let thing = e.currentTarget.innerText

        switch (thing) {

          case "C": {
            CurrentStack.value = []
            return
          }

          case "⌫": {
            let most = CurrentStack.value.slice(0, CurrentStack.value.length - 1)
            CurrentStack.value = most
            return
          }

          case "⏾":
            return

          case "=": {
            debugger
            return
          }

        }

        CurrentStack.value = [...CurrentStack.value, thing]

        switch (thing) {
          case "÷":
          case "-":
          case "+":
          case "×":
            return CurrentValue.value = CurrentStack.value
        }

      }}
    />
  )
}

export default () => {
  return (
    <div class="calculator">
      <Head>
        <link rel="stylesheet" href="calculator.css" />
        <meta name="viewport" content="width=device-width" />
      </Head>
      <div class="meta-grid">
        <div class="log">
          <div>345 x 12 = 1230</div>
          <div>345 x 12 = 1230</div>
          <div>345 x 12 = 1230</div>
          <div>345 x 12 = 1230</div>
          <div>345 x 12 = 1230</div>
          <div>345 x 12 = 1230</div>
          <div>345 x 12 = 1230</div>
          <div>345 x 12 = 1230</div>
          <div>345 x 12 = 1230</div>
          <div>345 x 12 = 1230</div>
          <div>345 x 12 = 1230</div>
          <div>345 x 12 = 1230</div>
          <div>345 x 12 = 1230</div>
        </div>
        <div class="calculator-grid">
          <span class="i">{CurrentValue.value.join("") || 0}</span>
          <span class="i i2">{CurrentStack.value.join("") || 0}</span>
          <Action className="g">C</Action>
          <Action className="g">⌫</Action>
          <Action className="g">⏾</Action>
          <Action className="a">÷</Action>
          <Action className="n">7</Action>
          <Action className="n">8</Action>
          <Action className="n">9</Action>
          <Action className="a">+</Action>
          <Action className="n">4</Action>
          <Action className="n">5</Action>
          <Action className="n">6</Action>
          <Action className="a">-</Action>
          <Action className="n">1</Action>
          <Action className="n">2</Action>
          <Action className="n">3</Action>
          <Action className="a">×</Action>
          <Action className="n double">0</Action>
          <Action className="n">.</Action>
          <Action className="a">=</Action>
        </div>
      </div>
    </div>
  )
}