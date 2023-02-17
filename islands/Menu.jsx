import NumberGameActions from "../components/numberGame.actions.jsx";
import { useState } from "preact/hooks";

export default (args) => {
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

  return (
    <header>
      {$menu}
      <div class={`navigation ${MenuOpen ? "open" : ""}`}>
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
          <a href="/sound">Sound</a>
          <a href="/music2">Music</a>
          <a href="/colorthing">Color Thing</a>
          <a href="/colorfinder">Color Finder</a>
          <a href="/bignumbers">Big Numbers</a>
          <a href="/timer3">Timer</a>
          <a href="/lasko">Lasko</a>
          <a href="/kids">Kids</a>
          <a href="/spin">Spin</a>
          <NumberGameActions />
        </nav>
      </div>
    </header>
  );
};
