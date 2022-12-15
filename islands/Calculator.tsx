import { Head } from "$fresh/runtime.ts"
import { useRef, useEffect, useState } from 'preact/hooks'
import { CurrentStack, CurrentValue } from '../data/Calculations.ts'
import Buttons from '../components/_CalculatorButtons.tsx'
import Values from '../components/_CalculatorValues.tsx'
import Log from '../components/_CalculatorLog.tsx'
import Dialog from '../components/Dialog.tsx'

export default () => {

  return (
    <Dialog>
      {D => (
        <div class="main2">
          <Head>
            <link rel="stylesheet" href="calculator.css" />
          </Head>
          <div class="calculator meta-grid">
            <Log />
            <div class="calculator-grid">
              <Values />
              <Buttons {...{ D }} />
            </div>
            <D.Dialog ref={D.ref}>
              <Log />
            </D.Dialog>
          </div>
        </div>
      )}
    </Dialog>
  )
}