import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import KidThing from "../islands/KidThing.jsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/ampm/style.css"></link>
      </Head>
      <Menu />
    </>
  );
}
