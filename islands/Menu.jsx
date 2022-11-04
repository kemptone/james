import { useState, useEffect } from "preact/hooks";
import NumberGameActions from "../components/numberGame.actions.jsx";

export default ({ $top }) => {

    const $dog = (<div></div>)

    const [ isOpen, changeIsOpen ] = useState(false)

    const toggle = () => {
        changeIsOpen( !isOpen )
    }

    return (
        <header>
            <div 
                id="hamburgermenu"
                onClick={ toggle }
                className={ isOpen ? "open" : "" }
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className={ `navigation${ isOpen ? " open" : "" }` }>
                <ul>
                    <li>
                        <a href="/">Another game</a>
                    </li>
                    <li>
                        <a href="/">Another game 2</a>
                    </li>
                </ul>
            </nav>
        </header>
    )

}