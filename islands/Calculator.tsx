import { Head } from "$fresh/runtime.ts"
import { useRef, useEffect, useState } from 'preact/hooks'
import { CurrentStack, CurrentValue } from '../data/Calculations.ts'
import Buttons from './_CalculatorButtons.tsx'
import Values from './_CalculatorValues.tsx'
import Log from './_CalculatorLog.tsx'

export default () => {

  return (
    <div class="main">
      <div class="calculator">
        <Head>
          <link rel="stylesheet" href="calculator.css" />
        </Head>
        <div class="meta-grid">
          <Log />
          <div class="calculator-grid">
            <Values />
            <Buttons />
          </div>
        </div>
      </div>
    </div>
  )
}