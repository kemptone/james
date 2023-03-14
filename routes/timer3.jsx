import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import Timer4 from "../islands/Timer4.tsx";

export default function Music() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/timernew/style.css" />
      </Head>
      <Timer4 />
      <Menu />
    </>
  );
}
