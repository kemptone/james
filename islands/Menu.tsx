import AllSettings from "../components/AllSettings.tsx";
import { useEffect, useState } from "preact/hooks";

export default () => {
  const [MenuOpen, open] = useState(false);

  const $menu = (
    <div class="menu-wrap">
      <button
        id="hamburgermenu"
        onClick={(e) => {
          open((o) => !o);
        }}
        className={MenuOpen ? "open" : ""}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  );

  useEffect(() => {
    document.querySelectorAll("#main-header a").forEach((Element) => {
      Element.addEventListener("click", (e: Event) => {
        // e.preventDefault()
        e.stopPropagation();
      });
    });
  }, []);

  return (
    <header id="main-header">
      {$menu}
      <div
        class={`navigation ${MenuOpen ? "open" : ""}`}
        onClick={(e) => open(false)}
      >
        <nav>
          <a href="/">Home</a>
          <a href="/calculator">Calculator</a>
          <span>
            <a href="/brownthing">Brown Thing</a>
            <span>&nbsp;&nbsp;</span>
            <a href="/brownthing?countby=2">2</a>
            <span>&nbsp;&nbsp;</span>
            <a href="/brownthing?countby=3">3</a>
            <span>&nbsp;&nbsp;</span>
            <a href="/brownthing?countby=5">5</a>
            <span>&nbsp;&nbsp;</span>
            <a href="/brownthing?countby=10">10</a>
          </span>
          <a href="/voice">Voice</a>
          <a href="/music2">Music</a>
          <a href="/colorthing">Color Thing</a>
          <a href="/colorfinder">Color Finder</a>
          <a href="/bignumbers">Big Numbers</a>
          <a href="/timer3">Timer</a>
          <a href="/lasko">Lasko</a>
          <a href="/kids">Kids</a>
          <a href="/spin">Spin</a>
          <a href="/recorder">Recorder</a>
          <a href="https://smooth.talkrapp.com/#/">Talker</a>
          <AllSettings />
        </nav>
      </div>
    </header>
  );
};
