import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import BigNumbers from "../islands/BigNumbers.tsx";

export default function Music() {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>Web Audio API examples: Loading audio files</title>
        <link rel="stylesheet" type="text/css" href="/bignumbers/style.css" />
      </Head>
      <BigNumbers />
      <Menu />
    </>
  );
}
