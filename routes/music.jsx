import { Head } from "$fresh/runtime.ts";
import Menu from "../islands/Menu.tsx";

export default function Music() {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <title>Web Audio API examples: Loading audio files</title>
        <meta
          name="description"
          content="A way to make sure files have loaded before playing them"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="stylesheet" type="text/css" href="/music.css" />
        <script src="/music.js" type="module"></script>
      </Head>

      <button id="startbutton">Press to load tracks</button>

      <div class="wrapper">
        <section id="tracks">
          <ul>
            <li data-loading="true">
              <a href="/music/leadguitar.mp3" class="track">Lead Guitar</a>
              <p class="loading-text">Loading...</p>
              <button
                data-playing="false"
                aria-decribedby="guitar-play-label"
                class="playbutton"
              >
                <span id="guitar-play-label">Play</span>
              </button>
            </li>
            <li data-loading="true">
              <a href="/music/bassguitar.mp3" class="track">Bass Guitar</a>
              <p class="loading-text">Loading...</p>
              <button
                data-playing="false"
                aria-describedby="bass-play-label"
                class="playbutton"
              >
                <span id="bass-play-label">Play</span>
              </button>
            </li>
            <li data-loading="true">
              <a href="/music/drums.mp3" class="track">Drums</a>
              <p class="loading-text">Loading...</p>
              <button
                data-playing="false"
                aria-describedby="drums-play-label"
                class="playbutton"
              >
                <span id="drums-play-label">Play</span>
              </button>
            </li>
            <li data-loading="true">
              <a href="/music/horns.mp3" class="track">Horns</a>
              <p class="loading-text">Loading...</p>
              <button
                data-playing="false"
                aria-describedby="horns-play-label"
                class="playbutton"
              >
                <span id="horns-play-label">Play</span>
              </button>
            </li>
            <li data-loading="true">
              <a href="/music/clav.mp3" class="track">Clavi</a>
              <p class="loading-text">Loading...</p>
              <button
                data-playing="false"
                aria-describedby="clavi-play-label"
                class="playbutton"
              >
                <span id="clavi-play-label">Play</span>
              </button>
            </li>
          </ul>
          <p class="sourced">
            All tracks sourced from{" "}
            <a href="http://jplayer.org/">jplayer.org</a>
          </p>
        </section>
      </div>
      <Menu is_deno={false} />
    </>
  );
}
