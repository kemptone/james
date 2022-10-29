import { Head } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import { Button } from '../components/Button.tsx'
import NumberGame from '../islands/NumberGame.tsx'

// ÷ × + -

export default function Home() {

  return (
    <>
      <Head>
        <title>James and the Giant Peach</title>
        <link rel="stylesheet" href="style.css" />
      </Head>
      <main>
        <header>
          Numbers and cool stuff like that
        </header>
        <NumberGame />
      </main>
    </>
  );
}
