import { useEffect, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import NumberGameActions from "../components/numberGame.actions.jsx";
import { MenuOpen } from "../data/State.ts";
import { Head } from "$fresh/runtime.ts";

export default (args) => {
  const $menu = (
    <div class="menu-wrap">
      <div
        id="hamburgermenu"
        onClick={(e) => {
          MenuOpen.value = !MenuOpen.value;
        }}
        className={MenuOpen.value ? "open" : ""}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );

  return (
    <header>
      {$menu}
      <div class={`navigation ${MenuOpen.value ? "open" : ""}`}>
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
          <a href="/timer2">Timer</a>
          <NumberGameActions />
        </nav>
      </div>
    </header>
  );
};
