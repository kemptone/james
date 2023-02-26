import NumberGame from "../islands/NumberGame.jsx";
import Menu from "../islands/Menu.jsx";
import { Head } from "$fresh/runtime.ts";

// ÷ × + -

export default function Home() {
  return (
    <>
      <Head>
        <title>Number Deno Dev</title>
        {
          /* <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js">
        </script> */
        }
      </Head>
      <NumberGame />
      <Menu is_deno={true} />
    </>
  );
}
