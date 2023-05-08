import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import SoundGame from "../islands/SoundGame.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/soundgame/style.css"></link>
      </Head>
      <SoundGame />
      <Menu />
    </>
  );
}
