import { Head } from "$fresh/runtime.ts"
import { useRef, useEffect, useState } from 'preact/hooks'
import { CurrentStack, CurrentValue } from '../data/Calculations.ts'
import Buttons from './_CalculatorButtons.tsx'
import Values from './_CalculatorValues.tsx'
import Log from './_CalculatorLog.tsx'
import Dialog from '../components/Dialog.tsx'

export default () => {

  return (
    <Dialog>
      {D => (
        <div class="main">
          <div class="calculator">
            <Head>
              <link rel="stylesheet" href="calculator.css" />
            </Head>
            <div class="meta-grid">
              <Log />
              <div class="calculator-grid">
                <Values />
                <Buttons {...{ D }} />
              </div>
            </div>
          </div>
          <D.Dialog ref={D.ref}>
            <Log />
          </D.Dialog>
        </div>
      )}
    </Dialog>
  )
}