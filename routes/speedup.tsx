import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import SpeedUp from "../islands/SpeedUp.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/speedup/style.css"></link>
      </Head>
      <SpeedUp />
      <Menu />
    </>
  );
}
