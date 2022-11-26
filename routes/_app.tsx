import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="menu.css" />
        <link rel="stylesheet" href="style.css" />
        <link rel="stylesheet" href="dialog.css" />
        <link rel="stylesheet" href="fonts.css" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" /> */}
      </Head>
      <Component />
    </>
  );
}