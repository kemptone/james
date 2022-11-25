import { useState, useEffect } from "preact/hooks";
import { useSignal } from '@preact/signals'
import NumberGameActions from '../components/numberGame.actions.jsx'
import { MenuOpen } from '../data/State.ts'
import { Head } from '$fresh/runtime.ts'

export default args => {

    const $menu = (
        <div
            id="hamburgermenu"
            onClick={e => {
                MenuOpen.value = !MenuOpen.value
            }}
            className={MenuOpen.value ? "open" : ""}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    )

    return (
        <header>

            <Head>
                <link rel="stylesheet" href="menu.css" />
                <link rel="stylesheet" href="style.css" />
                <link rel="stylesheet" href="dialog.css" />
                <link rel="stylesheet" href="fonts.css" />
                <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
            </Head>

            {$menu}
            <div class={`navigation ${MenuOpen.value ? "open" : ""}`}>
                <nav>
                    <a href="/">Home</a>
                    <a href="/calculator">Calculator</a>
                </nav>
                {args.is_deno ? (
                    <NumberGameActions />
                ) : null}
            </div>
        </header>
    )

}