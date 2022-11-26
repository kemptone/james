import { Head } from "$fresh/runtime.ts";
import NumberGame from '../islands/NumberGame.tsx'
import Menu from '../islands/Menu.jsx'
import Calculator from '../islands/Calculator.tsx'

export default () => {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      </Head>
      <Menu />
      <Calculator />
    </>
  )

}