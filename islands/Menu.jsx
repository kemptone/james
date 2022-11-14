import { useState, useEffect } from "preact/hooks";
import { useSignal } from '@preact/signals'
import NumberGameActions from '../components/numberGame.actions.jsx'
import { MenuOpen } from '../data/State.ts'

export default () => {

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
            {$menu}
            <nav class={`navigation ${MenuOpen.value ? "open" : ""}`}>
                <NumberGameActions />
            </nav>
        </header>
    )

}