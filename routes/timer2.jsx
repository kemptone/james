import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";
import Timer3 from "../islands/timer2.jsx";

export default function Music() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/timerold/style.css" />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js"
          integrity="sha512-6+YN/9o9BWrk6wSfGxQGpt3EUK6XeHi6yeHV+TYD2GR0Sj/cggRpXr1BrAQf0as6XslxomMUxXp2vIl+fv0QRA=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        >
        </script>
      </Head>
      <Timer3 />
      <Menu />
    </>
  );
}
