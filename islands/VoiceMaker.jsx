import { useRef, useEffect, useState } from 'preact/hooks'
import Voice, { iOSVoiceNames } from '../helpers/voice.js'
import { CountryKeys } from '../data/Countries.ts'
import Languages from '../data/Languages.ts'

export default args => {

  const [voices, addVoices] = useState([])

  useEffect(() => {

    const allVoices = loadAllVoiceList()
    const flatlist = []

    allVoices.forEach(voice => {
      const [langKey, countryKey] = voice.lang.split("-")
      flatlist.push({
        name: voice.name
        , localService: voice.localService
        , voiceURI: voice.voiceURI
        , lang: {
          countryKey
          , langKey
          , countryName: CountryKeys[countryKey]
          , ...Languages[langKey]
        }
      })
    })

    const languages_set = new Set(allVoices.map(i => i.lang))
    addVoices(flatlist)

  }, [])

  return (
    <div style="max-width:800px; margin:0 auto;">
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
      </fieldset>
    </div>
  )
}


function loadAllVoiceList() {

  const synth = window.speechSynthesis

  const voices = synth.getVoices().sort(function (a, b) {
    const aname = a.lang
    const bname = b.lang

    if (aname < bname) {
      return -1
    } else if (aname == bname) {
      return 0
    } else {
      return +1
    }
  })

  return voices
}