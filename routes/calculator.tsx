import Menu from "../islands/Menu.tsx";
import Calculator from "../islands/Calculator.tsx";
import { Head } from "$fresh/runtime.ts";

export default () => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="calculator.css" />
      </Head>
      <Calculator />
      <Menu />
    </>
  );
};
