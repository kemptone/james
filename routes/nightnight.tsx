import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import NightNight from "../islands/NightNight.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/nightnight/style.css"></link>
      </Head>
      <NightNight />
      <Menu />
    </>
  );
}
