import { Head } from "$fresh/runtime.ts";
import Menu from '../islands/Menu.jsx'

export default function Home() {

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/brownthing/style.css"></link>
        <script async src="/brownthing/index.js" type="module"></script>
      </Head>
      <header></header>
      <main>
        <div id="wrap">
          <textarea id="readout"></textarea>
          <div id="letters" class="letters show-numbers"></div>
        </div>
      </main>
      <footer></footer>
      <Menu />
    </>
  );
}


// <textarea id="readout" onClick="this.setSelectionRange(0, this.value.length)"></textarea>