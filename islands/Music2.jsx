import { Head } from "$fresh/runtime.ts";
import Menu from '../islands/Menu.jsx'
import { useEffect, useState } from 'preact/hooks'

const Mixer = [
  [ "/music/leadguitar.mp3", "Lead Guitar" ]
  , [ "/music/bassguitar.mp3", "Bass Guitar" ]
  , [ "/music/drums.mp3", "Drums" ]
  , [ "/music/horns.mp3", "Horns" ]
  , [ "/music/clav.mp3", "Clav" ]
]

export default function Music () {

  let audioCtx = null
  let offset = 0

  async function getFile (filepath) {
    const response = await fetch(filepath)
    const arrayBuffer = await response.arrayBuffer()
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
    return audioBuffer
  }

  function playTrack (audioBuffer) {
    const trackSource = new AudioBufferSourceNode(
      audioCtx
      , { buffer: audioBuffer }
    )
    trackSource.connect(audioCtx.destination)

    if (offset == 0) {
      trackSource.start()
      offset = audioCtx.currentTime
    } else {
      trackSource.start(0, audioCtx.currentTime - offset)
    }

    return trackSource
  }

  return (
    <>
      <Head>
        <title>Web Audio API examples: Loading audio files</title>
        <link rel="stylesheet" href="voice.css" />
      </Head>

      <div>

        <div className="voice-page">
          { Mixer.map(([ sound, name ]) => {
            return (
              <button
                children={ name }
                key={ sound }
                type="button"
                onClick={ e => {

                  if (audioCtx === null)
                    audioCtx = new AudioContext()

                  getFile(sound).then( file => {
                    console.log({ sound, file })

                    if (audioCtx.state === "suspended")
                      audioCtx.resume()

                    playTrack( file )

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