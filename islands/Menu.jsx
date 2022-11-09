import { useState, useEffect } from "preact/hooks";

export default ({ children }) => {

    const [ isOpen, changeIsOpen ] = useState(false)

    const toggle = () => {
        changeIsOpen( !isOpen )
    }

    const close = () => {
        changeIsOpen( false )
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

    const $links = null

    const $nav = (
            <nav className={ `navigation${ isOpen ? " open" : "" }` }>
                { $links }
            </nav>
    )


    return children({ $menu, $nav, $links, isOpen, close })


}