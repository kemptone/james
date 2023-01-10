import Music2 from "../islands/Music2.jsx";
import Menu from "../islands/Menu.jsx";
import { Head } from "$fresh/runtime.ts";

// ÷ × + -

export default function Home() {
  return (
    <>
      <Head>
        <title>Web Audio API examples: Loading audio files</title>
        <link rel="stylesheet" href="voice.css" />
      </Head>
      <Music2 />
      <Menu />
    </>
  );
}
