import { firstFive } from "./firstFive.js"

const SPECIAL = "mi bi tri quadri quinti sexti septi octi noni".split(" ")
const DIG_00x = "un duo tre quattuor quin sex septen octo novem".split(" ")
const DIG_0x0 = "dec vigin trigin quadragin quinquagin sexagin septuagin octogin nonagin".split(" ")
const DIG_x00 = "cen duocen trecen quadringen quingen sescen septingen octingen nongen".split(" ")
const NORMAL = [
  DIG_0x0
  , DIG_00x
  , DIG_x00
]

export function buildCardinals(Cardinals) {

  let x = 0
  let y = 0 // by 3
  let powerNumber = 0
  let limit = 1e5

  while (x < limit) {

    if (y === 0)
      powerNumber += 1

    let _builder = String(powerNumber).split('').map(n => Number(n))
    let [ a, b, ...rest ] = _builder.reverse()
    let builder = [ b, a, ...rest ].filter( i => i !== undefined )
    let stringArray = []

    if (builder.length === 1)
      stringArray.push( SPECIAL[ builder[0] - 1 ] + "llion" )
    else {

      if (b === 1)
        stringArray.push( "illion" )
      else
        stringArray.push( "tillion" )

      builder.forEach( (item, index) => {
        if (index === 4) {
          let r = NORMAL[ 0 ]
          stringArray.push( r[ item - 1 || 0 ] )
        }
        if (index === 3) {
          let r = NORMAL[ 1 ]

          stringArray.push( "millia" )

          if ((item - 1) !== 0)
            stringArray.push( r[ item - 1 || 0 ])

        }
        let r = NORMAL[ index ]
        if (r && r[ item - 1 ])
          stringArray.push( r[ item - 1 || 0 ] )
      })
    }

    stringArray.push( firstFive( y ) )

    stringArray.reverse()

    let ret = {
      builder
      , y
      , powerNumber
      , stringArray
      , index : x + 6
    }

    Cardinals.push(ret)

    if (ret.index === 601 || ret.index === 933)
      console.log(ret, {
        601 : "ten cennovemnonagintillion"
        , 933 : "one trecendecillion"
      })

    x++
    y++


    if (y > 2)
      y = 0

  }


}

// 10_104	    34	    3 and 30	        one hundred tretrigintillion

// 10 601     ten cen novem nonagin tillion

// 801 one duo cen sex sexagin tillion