import { Head } from "$fresh/runtime.ts";
import Test from "../islands/Test.tsx";
import Menu from "../islands/Menu.tsx";

// ÷ × + -

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/timernew/style.css" />
      </Head>
      <div className="voice-page">
        <span></span>
        <Test />
      </div>
      <Menu is_deno={false} />
    </>
  );
}
