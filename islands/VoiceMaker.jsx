import { useRef, useEffect, useState } from 'preact/hooks'
// import Voice, { iOSVoiceNames } from '../helpers/voice.js'
// import { CountryKeys } from '../data/Countries.ts'
// import Languages from '../data/Languages.ts'
import VoiceMakerEffect, { loadAllVoiceList } from './VoiceMaker.effect.jsx'

export default args => {

  const synth = window.speechSynthesis
  // const [allVoices, loadVoices] = useState([])
  const [voices, addVoices] = useState([])
  const [englishOnly, changeEnglishOnly] = useState(true)

  const ret = {}

  useEffect(VoiceMakerEffect(addVoices, englishOnly, synth), [englishOnly])

  function speak(e) {

    const allVoices = loadAllVoiceList()

    const {
      read
      , voice_name
    } = Object.fromEntries(new FormData(e.currentTarget))


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

      const selected_voice = allVoices.find(item => item.name === voice_name)

      utterThis.voice = selected_voice

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
      // const Form = Object.fromEntries(new FormData(e.currentTarget))
      // debugger
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
              value={voiceURI}
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

