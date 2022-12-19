import { Head } from "$fresh/runtime.ts";

export default function Home() {

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/brownthing/style.css"></link>
        <script async src="/brownthing/index.js" type="module"></script>
      </Head>
      <header></header>
      <main>
        <h1>FARD</h1>
        <div id="wrap">
          <textarea id="readout"></textarea>
          <div id="letters" class="letters show-numbers"></div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}


// <textarea id="readout" onClick="this.setSelectionRange(0, this.value.length)"></textarea>