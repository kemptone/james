import { useRef, useEffect, useState } from 'preact/hooks'
import { CountryKeys } from '../data/Countries.ts'
import Voice, { iOSVoiceNames } from '../helpers/voice.js'
import Languages from '../data/Languages.ts'

export function loadAllVoiceList() {
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

export default (addVoices, englishOnly, synth) => e => {

  // const synth = window.speechSynthesis
  const allVoices = loadAllVoiceList()
  const flatlist = []

  // loadVoices(allVoices)

  allVoices
    .filter(voice => {
      if (englishOnly) {
        let [lang, region] = voice?.lang?.split("-") ?? ["fard", "FARD"]
        return lang === "en"
      }
      return true
    })
    .forEach(voice => {
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
        , voice: voice
      })
    })

  const languages_set = new Set(allVoices.map(i => i.lang))
  addVoices(flatlist)


}