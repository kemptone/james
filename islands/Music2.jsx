import { Head } from "$fresh/runtime.ts";
import Menu from '../islands/Menu.jsx'
import { useState } from 'preact/hooks'

const OriginalMixer = [
  [ "/music/drums.mp3", "Drums" ]
  , [ "/music/bassguitar.mp3", "Bass Guitar" ]
  , [ "/music/leadguitar.mp3", "Lead Guitar" ]
  , [ "/music/clav.mp3", "Clav" ]
  , [ "/music/horns.mp3", "Horns" ]
]

export default function Music () {

  const [ Mixer, change ] = useState([])

  let audioCtx = null

  async function getFile (filepath) {
    const response = await fetch(filepath)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
    return audioBuffer
  }

  function loadAllTracks (e, after) {
    if (audioCtx === null)
      audioCtx = new AudioContext()

    if (audioCtx.state === "suspended")
      audioCtx.resume()

    const promises = []

    OriginalMixer.forEach(( [ sound, name ] ) => {
      promises.push(getFile(sound).then( file => {
        const buffer = new AudioBufferSourceNode(
          audioCtx
          , { buffer: file }
        )
        buffer.loop = true
        const gain = new GainNode(audioCtx, { gain : 0})
        buffer.connect(gain)
        gain.connect(audioCtx.destination)
        // buffer.start()

        change(mixer => ([
          ...mixer
          , [ sound, name, buffer, gain ]
        ]))

        after && after(gain)

        return [ sound, name, buffer, gain ]

      }))
    })

    Promise.all( promises ).then( () => {
      promises.forEach( p => {
        p.then( item => {
          item[2].start()
        })
      })
    })

  }

  return (
    <>
      <Head>
        <title>Web Audio API examples: Loading audio files</title>
        <link rel="stylesheet" href="voice.css" />
      </Head>

      <div>

        <div className="voice-page">
          { Mixer.length === 0 ? (
          <button
            children="LOAD ALL"
            onClick={ loadAllTracks }
          />
          ) : null }

          { Mixer.map(( item, index ) => {

            const [ sound, name, buffer, gain, playing ] = item

            return (
              <button
                children={ name }
                key={ sound }
                type="button"
                class={ playing ? "playing" : "" }
                onClick={ e => {

                  if (gain.gain.value > 0)
                    gain.gain.value = 0
                  else
                    gain.gain.value = 1

                  change( prev => {
                    return prev.map( item => {
                      if (item[0] === sound)
                        return [ sound, name, buffer, gain, gain.gain.value === 1 ]
                      else
                        return item
                    })
                  })

                }}
              />
            )
          })}
        </div>

      </div>

      <Menu is_deno={false} />
    </>
  )

}