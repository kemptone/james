import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import AmPm from "../islands/AmPm.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/ampm/style.css"></link>
      </Head>
      <AmPm />
      <Menu />
    </>
  );
}
