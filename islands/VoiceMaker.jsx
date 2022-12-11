import { useRef, useEffect, useState } from 'preact/hooks'
// import Voice, { iOSVoiceNames } from '../helpers/voice.js'
// import { CountryKeys } from '../data/Countries.ts'
// import Languages from '../data/Languages.ts'
import VoiceMakerEffect from './VoiceMaker.effect.jsx'

export default args => {

  const [voices, addVoices] = useState([])
  const [englishOnly, changeEnglishOnly] = useState(true)
  useEffect(VoiceMakerEffect(addVoices, englishOnly), [englishOnly])

  return (
    <div class="voice-maker">
      <fieldset>
        <legend>Pick Voice</legend>
        <select>
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
    </div>
  )
}

