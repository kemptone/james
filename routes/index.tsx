import { Head } from "$fresh/runtime.ts";
import NumberGame from '../islands/NumberGame.tsx'

// ÷ × + -

export default function Home() {

  return (
    <>
      {/* <Head>
        <title>🂻 Number Games</title>
        <link rel="stylesheet" href="style.css" />
        <link rel="stylesheet" href="menu.css" />
        <link rel="stylesheet" href="fonts.css" />
      </Head> */}
      <NumberGame />
    </>
  );
}
