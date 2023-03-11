import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import ColorThing from "../islands/ColorThing.jsx";
import ColorFinder from "../islands/ColorFinder.jsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/colorfinder/style.css"></link>
      </Head>
      <ColorFinder />
      <Menu />
    </>
  );
}
