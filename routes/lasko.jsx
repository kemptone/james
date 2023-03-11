import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";

export default function Music() {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>ZASKO LASKO</title>
        <link rel="stylesheet" type="text/css" href="/lasko/style.css" />
        <script src="/lasko/app.js" type="module"></script>
      </Head>
      <div id="base"></div>
      <Menu is_deno={false} />
    </>
  );
}
