import { useRef, useEffect, useState } from 'preact/hooks'
import VoiceMakerEffect from './VoiceMaker.effect.jsx'

export default args => {

  const synth = window.speechSynthesis
  const [voices, addVoices] = useState([])
  const [englishOnly, changeEnglishOnly] = useState(true)

  const ret = {}

  useEffect(VoiceMakerEffect(addVoices, englishOnly, synth), [englishOnly])

  function speak(e) {

    const {
      read
      , voice_name
    } = Object.fromEntries(new FormData(e.currentTarget))

    // alert(JSON.stringify({
    //   read
    //   , voice_name
    //   , voices
    // }))

    if (synth.speaking) {
      console.error("speechSynthesis.speaking")
      return
    }

    if (read) {
      let utterThis = new SpeechSynthesisUtterance(read)

      utterThis.onend = function (event) {
        console.log("SpeechSynthesisUtterance.onend")
      }

      utterThis.onerror = function (event) {
        console.error("SpeechSynthesisUtterance.onerror")
      }

      const selected_voice = voices.find(item => item.name === voice_name)

      utterThis.voice = selected_voice.voice

      // const selectedOption =
      //   voiceSelect.selectedOptions[0].getAttribute("data-name")

      // for (let i = 0; i < voices.length; i++) {
      //   if (voices[i].name === selectedOption) {
      //     utterThis.voice = voices[i]
      //     break;
      //   }
      // }
      // utterThis.pitch = pitch.value;
      // utterThis.rate = rate.value;
      synth.speak(utterThis)
    }
  }

  return (
    <form class="voice-maker" onSubmit={e => {
      e.preventDefault()
      speak(e)
    }}>
      <fieldset>
        <legend>Pick Voice</legend>
        <select name="voice_name">
          {voices.map(({
            name
            , lang
            , countryName
            , voiceURI
          }) => (
            <option
              value={name}
              children={`${name} : ${lang.countryName} : ${lang.name}`}
            />
          ))}
        </select>
        <label>
          <input
            type="checkbox" checked={englishOnly}
            onChange={e => changeEnglishOnly(!englishOnly)}
          ></input>
          English only
        </label>
      </fieldset>
      <fieldset class="say-this">
        <legend>Say This</legend>
        <textarea name="read"></textarea>
        <button type="submit">Say this ⏎</button>
      </fieldset>
    </form>
  )
}

