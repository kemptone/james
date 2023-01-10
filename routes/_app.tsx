import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="manifest" href="manifest.json" />
        <link rel="stylesheet" href="menu.css" />
        <link rel="stylesheet" href="style.css" />
        <link rel="stylesheet" href="dialog.css" />
        <link rel="stylesheet" href="fonts.css" />
        <script src="loadserviceworker.js"></script>
        <script src="externalEval.js"></script>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js">
        </script>
      </Head>
      <Component />
    </>
  );
}
