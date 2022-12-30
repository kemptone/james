import { Head } from "$fresh/runtime.ts";
import Menu from '../islands/Menu.jsx'
import { useEffect, useState } from 'preact/hooks'
import MakeMixer from '../data/makeMixer.js'

export default function Music () {

  const Mixer = MakeMixer([
    [ "/music/leadguitar.mp3", "Lead Guitar" ]
    , [ "/music/bassguitar.mp3", "Bass Guitar" ]
    , [ "/music/drums.mp3", "Drums" ]
    , [ "/music/horns.mp3", "Horns" ]
    , [ "/music/clav.mp3", "Clav" ]
  ])

  let audioCtx = null

  const [ offset, setOffset ] = useState(0)

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

    Mixer.forEach(([ item, change ]) => {
      const [ sound, name ] = item
      getFile(sound).then( file => {
        const buffer = new AudioBufferSourceNode(
          audioCtx
          , { buffer: file }
        )
        buffer.loop = true
        const gain = new GainNode(audioCtx, { gain : 0})
        buffer.connect(gain)
        gain.connect(audioCtx.destination)
        buffer.start()

        change([ sound, name, buffer, gain ])
        after && after(gain)
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
          <button
            children="LOAD ALL"
            onClick={ loadAllTracks }
          />

          { Mixer.map(( [ item, change ] ) => {

            const [ sound, name, buffer, gain, playing ] = item

            return (
              <button
                children={ name }
                key={ sound }
                type="button"
                class={ playing ? "playing" : "" }
                onClick={ e => {

                  if (!gain)
                    return

                  if (audioCtx === null)
                    audioCtx = new AudioContext()

                  if (playing)
                    gain.gain.value = 0
                  else
                    gain.gain.value = 1

                  change([ sound, name, buffer, gain, !playing ])

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