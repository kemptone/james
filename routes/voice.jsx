import { Head } from "$fresh/runtime.ts";
import VoiceMaker from "../islands/VoiceMaker.tsx";
import Menu from "../islands/Menu.jsx";

// ÷ × + -

export default function Home() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="voice.css" />
      </Head>
      <div className="voice-page">
        <span></span>
        <VoiceMaker />
      </div>
      <Menu is_deno={false} />
    </>
  );
}
