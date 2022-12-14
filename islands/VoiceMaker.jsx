import VoiceMakerEffect, { Speak } from './VoiceMaker.effect.jsx'
import { useRef } from 'preact/hooks'

export default args => {

  const textArea = useRef()

  const {
    synth
    , voices
    , englishOnly
    , changeEnglishOnly
  } = VoiceMakerEffect()

  const clear = e => {
    const e_read = document.getElementById("read")
    e_read.value = ''
    e_read.click()
    e_read.focus()
    // document.getElementById("read").click().focus()
    // textArea.current.value = ''
    // textArea.current?.click?.()?.focus?.()
  }

  return (
    <form class="voice-maker" onSubmit={e => {
      e.preventDefault()
      Speak({ synth, voices })(e)
    }}>
      <fieldset>
        <legend>Pick Voice</legend>
        <select name="voice_name">
          {voices.map(({
            name
            , lang
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
        <textarea id="read" name="read"></textarea>
        <div class="action">
          <button type="submit">Say this ⏎</button>
          <button type="button" onClick={clear}>Clear</button>
        </div>
      </fieldset>
    </form>
  )
}

