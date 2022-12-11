import { Head } from "$fresh/runtime.ts";
import VoiceMaker from '../islands/VoiceMaker.jsx'
import Menu from '../islands/Menu.jsx'

// ÷ × + -

export default function Home() {

  return (
    <>
      <Head>
        <link rel="stylesheet" href="voice.css" />
      </Head>
      <div style="margin:90px auto 0; width:100%; max-width:880px">
        <h1>Text to Speech</h1>
        <VoiceMaker />
      </div>
      <Menu is_deno={false} />
    </>
  );
}
