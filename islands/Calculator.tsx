import { Head } from "$fresh/runtime.ts";
import { CurrentStack, CurrentValue } from '../data/Calculations.ts';

const Action = ({ className, children, onMouseDown }) => {
  return (
    <button
      {...{ className, children, onMouseDown }}
    />
  )
}

export default () => {

  const onMouseDown = e => {

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

  }

  return (
    <div class="calculator">
      <Head>
        <link rel="stylesheet" href="calculator.css" />
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
          <Action onMouseDown={onMouseDown} className="g">C</Action>
          <Action onMouseDown={onMouseDown} className="g">⌫</Action>
          <Action onMouseDown={onMouseDown} className="g">⏾</Action>
          <Action onMouseDown={onMouseDown} className="a">÷</Action>
          <Action onMouseDown={onMouseDown} className="n">7</Action>
          <Action onMouseDown={onMouseDown} className="n">8</Action>
          <Action onMouseDown={onMouseDown} className="n">9</Action>
          <Action onMouseDown={onMouseDown} className="a">+</Action>
          <Action onMouseDown={onMouseDown} className="n">4</Action>
          <Action onMouseDown={onMouseDown} className="n">5</Action>
          <Action onMouseDown={onMouseDown} className="n">6</Action>
          <Action onMouseDown={onMouseDown} className="a">-</Action>
          <Action onMouseDown={onMouseDown} className="n">1</Action>
          <Action onMouseDown={onMouseDown} className="n">2</Action>
          <Action onMouseDown={onMouseDown} className="n">3</Action>
          <Action onMouseDown={onMouseDown} className="a">×</Action>
          <Action onMouseDown={onMouseDown} className="n double">0</Action>
          <Action onMouseDown={onMouseDown} className="n">.</Action>
          <Action onMouseDown={onMouseDown} className="a">=</Action>
        </div>
      </div>
    </div>
  )
}