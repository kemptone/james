import { Head } from "$fresh/runtime.ts";
import { useRef, useEffect, useState } from 'preact/hooks'
import { CurrentStack, CurrentValue } from '../data/Calculations.ts';

const Action = ({ className, children, onMouseDown }) => {
  return (
    <button
      {...{ className, children, onMouseDown }}
    />
  )
}

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

const Values = () => {
  return (
    <>
      <span class="i">{CurrentValue.value.join("") || 0}</span>
      <span class="i i2">{CurrentStack.value.join("") || 0}</span>
    </>
  )
}

const Buttons = () => {
  return (
    <>
      <button className="g">C</button>
      <button className="g">⌫</button>
      <button className="g">⏾</button>
      <button className="a">÷</button>
      <button className="n">7</button>
      <button className="n">8</button>
      <button className="n">9</button>
      <button className="a">+</button>
      <button className="n">4</button>
      <button className="n">5</button>
      <button className="n">6</button>
      <button className="a">-</button>
      <button className="n">1</button>
      <button className="n">2</button>
      <button className="n">3</button>
      <button className="a">×</button>
      <button className="n double">0</button>
      <button className="n">.</button>
      <button className="a">=</button>
    </>
  )
}

export default () => {

  const gridRef = useRef(null)

  useEffect(() => {
    const buttons = gridRef.current.querySelectorAll("button")
    Array.from(buttons).forEach(item => {
      item.addEventListener("click", onMouseDown)
    })
  }, [])

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
        <div ref={gridRef} class="calculator-grid">
          <Values />
          <Buttons />
        </div>
      </div>
    </div>
  )
}