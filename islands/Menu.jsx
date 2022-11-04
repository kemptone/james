import { useState, useEffect } from "preact/hooks";
import NumberGameActions from "../components/numberGame.actions.jsx";

export default ({ children }) => {

    const [ isOpen, changeIsOpen ] = useState(false)

    const toggle = () => {
        changeIsOpen( !isOpen )
    }

    const $menu = (
            <div 
                id="hamburgermenu"
                onClick={ toggle }
                className={ isOpen ? "open" : "" }
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
    )

    const $links = (
                <ul>
                    <li>
                        <a href="/">Another game</a>
                    </li>
                    <li>
                        <a href="/">Another game 2</a>
                    </li>
                </ul>
    )

    const $nav = (
            <nav className={ `navigation${ isOpen ? " open" : "" }` }>
                { $links }
            </nav>
    )


    return children({ $menu, $nav })


    // return (
    //     <header>
    //         { $menu }
    //         { $nav }
    //     </header>
    // )

}