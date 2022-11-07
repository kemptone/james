import { useState, useEffect } from "preact/hooks";
import { Problem } from "../components/Problem.tsx";
import { initial } from "../helpers/smartMathGuy.ts";
import Menu from './Menu.jsx'
import NumberGameActions from '../components/numberGame.actions.jsx'
import { Head } from "$fresh/runtime.ts";
// import AnimationData from '../static/lottie/124803-devor.json' assert { type: "json" } 
// import Lottie from "../components/Lottie.jsx";

const Letters = [
  'https://assets4.lottiefiles.com/packages/lf20_x1z5clan.json' // A
  , 'https://assets4.lottiefiles.com/datafiles/QIvTSFIcsXyTpn0/data.json' // B
  , 'https://assets1.lottiefiles.com/packages/lf20_vhjuk4mn.json' // C
  , 'https://assets10.lottiefiles.com/packages/lf20_osuvgz5l.json' // d
  , 'https://assets2.lottiefiles.com/packages/lf20_bmflerrf.json' // e
]

const animations = [
  'https://assets10.lottiefiles.com/packages/lf20_lv7pxahw.json'          // 0
  , 'https://assets10.lottiefiles.com/packages/lf20_siofeolp.json'        // 1
  , 'https://assets10.lottiefiles.com/packages/lf20_dzevxknz.json'        // 2
  , 'https://assets10.lottiefiles.com/packages/lf20_l6jf9iln.json'        // 3
  , 'https://assets8.lottiefiles.com/packages/lf20_ktSmkGNdK2.json'       // 4
  , 'https://assets10.lottiefiles.com/packages/lf20_lc46h4dr.json'        // 5
  , 'https://assets6.lottiefiles.com/packages/lf20_gsdxva07.json'         // 6
  , 'https://assets7.lottiefiles.com/packages/lf20_ckj4gyfh.json'         // 7
  , 'https://assets6.lottiefiles.com/private_files/lf30_rmipxvc4.json'    // 8
  , 'https://assets6.lottiefiles.com/packages/lf20_7wwj26et.json'         // 9
  , 'https://assets6.lottiefiles.com/packages/lf20_icsucpgx.json'         // 10 heart
]

const animationSource = animations[ 0 ]

export default function NumberGame() {

  const [ number1MultiplyBy, setMultiplyBy ] = useState(1);
  const [ problem, setProblem ] = useState( initial(number1MultiplyBy) );
  const [ step, setStep ] = useState(0);

  useEffect(() => {
    setProblem(initial(number1MultiplyBy))
  }, [ step ])
  
  return (
      <div>
        <Head>
          <title>🂻 Number Games</title>
          <link rel="stylesheet" href="style.css" />
          <link rel="stylesheet" href="menu.css" />
          <link rel="stylesheet" href="fonts.css" />
          <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        </Head>
      <section class="math-problems">
        <Problem { ...problem } step={ step } onSubmit={ () => setStep( step + 1 )} act="÷" />
      </section>
      <span id="divisible">{ number1MultiplyBy }</span>

      <span className="animation">
      {/* @ts-expect-error: dugh */}
        <lottie-player 
          // src={ animations[0] }
          src={ animationSource }
          background="transparent"  
          speed=".25"  
          style="width: 300px; height: 300px;"  loop autoplay />
      </span>

        <Menu>
          { M => (
            <header>
              { M.$menu }
              <nav className={ `navigation${ M.isOpen ? " open" : "" }` }>
                  { M.$links }
                  <NumberGameActions 
                    { ...{
                      setStep
                      , setMultiplyBy
                      , number1MultiplyBy
                      , step
                    }}
                  />
              </nav>
            </header>
          )}
        </Menu>
        
      </div>
  );
}