import { Head } from "$fresh/runtime.ts";
import Menu from '../islands/Menu.jsx'
import ColorThing from '../islands/ColorThing.jsx'

export default function Home() {

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/colorthing/style.css"></link>
      </Head>
      <ColorThing />
      <Menu />
    </>
  );
}