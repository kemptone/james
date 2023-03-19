import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import Blades from "../islands/Blades.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/blades/style.css" />
      </Head>
      <main className="blades-page">
        <Blades />
      </main>
      <Menu />
    </>
  );
}
1;
