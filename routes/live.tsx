import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import LiveCams from "../islands/LiveCams.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/live/style.css"></link>
        <script src="https://www.youtube.com/iframe_api"></script>
      </Head>
      <LiveCams />
      <Menu />
    </>
  );
}
