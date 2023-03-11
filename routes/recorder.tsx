import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import Recorder from "../islands/Recorder.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/recorder/style.css"></link>
      </Head>
      <main className="recorder">
        <Recorder />
      </main>
      <Menu />
    </>
  );
}
