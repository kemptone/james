const Page = window.Page = {
  letters : "abcdefghijklmnopqrstuvwxyz".split("")
  , e_main : document.querySelector("main")
  , e_letters : document.querySelector("main #letters")
  , e_header : document.querySelector("header")
  , e_footer : document.querySelector("footer")
  , e_readout : document.querySelector("#readout")
  , values : []
  , isUpper : false
}

// New feature, change the iteration number by countby in query param
if (window.location.search)
  Page.countby = parseInt( Object.fromEntries( new URLSearchParams( window.location.search ) ).countby ) || 1
else
  Page.countby = 1

const UpdateDisplay = Page => e => {
  Page.e_readout.value = Page.values.join("")
}

const updateDisplay = UpdateDisplay(Page)

const Uppercase = Page => e => {
   Page.isUpper = !Page.isUpper
   updateDisplay()
}

const ClearReadout = Page => e => {
   Page.values.length = 0 // clear out
   updateDisplay()
}

const ClickLetterEvent = (Page, letter) => e => {
  Page.values.push( Page.isUpper ? letter.toUpperCase() : letter )
  updateDisplay()
}

const BuildControl = (Page, fragment) => (name, className, event) => {
  const e_element = document.createElement("button")
  e_element.innerHTML = name
  e_element.className = `control ${ className }`
  e_element.addEventListener("click", event)
  fragment.appendChild( e_element )
}

const BuildLetter = (Page, fragment) => (letter, index) => {
  const e_element = document.createElement("button")
  const e_b = document.createElement("b")
  const e_i = document.createElement("i")
  const e_em = document.createElement("em")

  e_b.innerHTML = letter
  e_i.innerHTML = Page.countby * (index + 1)

  e_element.appendChild(e_b)
  e_element.appendChild(e_i)
  e_element.appendChild(e_em)

  e_element.addEventListener("click", ClickLetterEvent( Page, letter ))
  fragment.appendChild(e_element)
}


// Main build
const BuildMain = Page => args => {
  const e_fragment = document.createDocumentFragment()
  Page.letters.forEach( BuildLetter( Page, e_fragment ) )

  BuildControl(Page, e_fragment)( "⇧", "uppercase", Uppercase(Page) )

  BuildControl(Page, e_fragment)( "", "space", e => {
    Page.values.push(" ")
    updateDisplay()
  } )

  BuildControl(Page, e_fragment)( "⟵", "delete", e => {
    Page.values.pop()
    updateDisplay()
  } )

  BuildControl(Page, e_fragment)( "✮", "toggle-letters", e => {
    Page.e_letters.classList.add("show-letters")
    Page.e_letters.classList.remove("show-numbers")
  } )

  BuildControl(Page, e_fragment)( "♺", "clear", ClearReadout(Page) )

  BuildControl(Page, e_fragment)( "✪", "toggle-numbers", e => {
    Page.e_letters.classList.add("show-numbers")
    Page.e_letters.classList.remove("show-letters")
  } )



  // Writes it to the page
  Page.e_letters.appendChild( e_fragment )

}

BuildMain(Page)()