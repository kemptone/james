import VoiceMakerEffect, { Speak } from '../effects/VoiceMaker.effect.jsx'
import { persist, populate } from '../helpers/localStorage.js'

export default args => {

  const {
    synth
    , voices
    , englishOnly
    , changeEnglishOnly
    , voice_name
    , read
  } = VoiceMakerEffect()

  const clear = e => {
    const e_read = document.getElementById("read")
    e_read.value = ''
    e_read.click()
    e_read.focus()
    const { voice_name, read } = populate("voice") ?? {}
    persist("voice", { read : "", voice_name })
  }

  return (
    <form class="voice-maker" onSubmit={e => {
      e.preventDefault()
      Speak({ synth, voices })(e)
    }}>
      <fieldset>
        <legend>Pick Voice</legend>
        <select name="voice_name" defaultValue={ voice_name }>
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
        <textarea id="read" name="read" defaultValue={ read }></textarea>
        <div class="action">
          <button type="submit">Say this ⏎</button>
          <button type="button" onClick={clear}>Clear</button>
        </div>
      </fieldset>
    </form>
  )
}

