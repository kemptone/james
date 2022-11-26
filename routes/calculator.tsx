import { Head } from "$fresh/runtime.ts";
import NumberGame from '../islands/NumberGame.tsx'
import Menu from '../islands/Menu.jsx'
import Calculator from '../islands/Calculator.tsx'

export default () => {

  return (
    <>
      <Calculator />
      <Menu />
    </>
  )

}