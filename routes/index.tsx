import { Head } from "$fresh/runtime.ts";
import NumberGame from '../islands/NumberGame.tsx'
import Menu from '../islands/Menu.jsx'

// ÷ × + -

export default function Home() {

  return (
    <>
      <Menu />
      <NumberGame />
    </>
  );
}
