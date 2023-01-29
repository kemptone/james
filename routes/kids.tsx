import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.jsx";
import KidThing from "../islands/KidThing.jsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/kidthing/style.css"></link>
      </Head>
      <KidThing />
      <Menu />
    </>
  );
}
