import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import KidThing from "../islands/KidThing.jsx";
import AllSettings from "../components/AllSettings.tsx";
import JamesSettings from "../islands/JamesSettings.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/kidthing/style.css"></link>
      </Head>
      <div style={{ height: "300px" }}></div>
      <JamesSettings />
      <Menu />
    </>
  );
}
