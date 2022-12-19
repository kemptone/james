import { useState, useEffect } from "preact/hooks";
import { useSignal } from '@preact/signals'
import NumberGameActions from '../components/numberGame.actions.jsx'
import { MenuOpen } from '../data/State.ts'
import { Head } from '$fresh/runtime.ts'

export default args => {

    const $menu = (
        <div class="menu-wrap">
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
        </div>
    )

    return (
        <header>
            {$menu}
            <div class={`navigation ${MenuOpen.value ? "open" : ""}`}>
                <nav>
                    <a href="/">Home</a>
                    <a href="/calculator">Calculator</a>
                    <a href="/sound">Sound</a>
                    <a href="/brownthing">Brown Thing</a>
                    <NumberGameActions />
                </nav>
            </div>
        </header>
    )

}