import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import KidThing from "../islands/KidThing.jsx";
import Spin from "../islands/Spin.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/spin/style.css"></link>
      </Head>
      <Spin />
      <Menu />
    </>
  );
}
