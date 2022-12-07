import { useRef, useEffect, useState } from 'preact/hooks'
import Voice, { iOSVoiceNames } from '../helpers/voice.js'


function loadAllVoiceList() {

  const synth = window.speechSynthesis;

  const voices = synth.getVoices().sort(function (a, b) {
    const aname = a.lang
    const bname = b.lang

    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
  });

  return voices
}

export default args => {

  const [voices, addVoices] = useState([])
  const [languages, addLanguages] = useState([])

  useEffect(() => {

    const allVoices = loadAllVoiceList()
    const languages_set = new Set(allVoices.map(i => i.lang))

    addVoices(loadAllVoiceList())
    addLanguages(Array.from(languages_set))

  })

  return (
    <div>
      <fieldset>
        <legend>Pick Voice</legend>

        <select>
          {languages.map(name => <option value={name} children={name} />)}
        </select>

        <select>
          {voices.map(({ name, lang }) => <option children={`${name} - ${lang}`} />)}
        </select>
      </fieldset>
    </div>
  )
}