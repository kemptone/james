import { useState } from "preact/hooks";
import { firstFive } from "../helpers/bignumbers/firstFive.js";
import { buildCardinals } from "../helpers/bignumbers/buildCardinals.js";
import useVoices from "../effects/useVoices.ts";

const Cardinals = [null, null, null, null, null, null];
buildCardinals(Cardinals);

export default (args) => {
  const [name, setName] = useState("");
  const [pronounce, setPronounce] = useState("");

  const {
    synth,
    voices,
    englishOnly,
    changeEnglishOnly,
    voice_name,
    read,
    Speak,
  } = useVoices();

  return (
    <main>
      <fieldset>
        <legend>🙋 Power of Ten</legend>
        <input
          type="number"
          name=""
          placeholder="0"
          id="input"
          autocomplete="off"
          min="0"
          max="1e5"
          pattern="\d{1, 5}"
          // onClick="this.setSelectionRange(0, this.value.length)"
          onChange={(e) => {
            const key = Number(e.target.value);

            if (key < 6) {
              setName(firstFive(key));
              setPronounce(firstFive(key));
              // P.e_name.value = firstFive(key);
              // P.e_pronounce.value = firstFive(key);
              return;
            }

            if (key > 1e4 * 10) {
              const msg = "😜 NUMBER TOO BIG! 😜";
              setName(msg);
              setPronounce(msg);
              // P.e_name.value = msg;
              // P.e_pronounce.value = msg;
              return alert(msg);
            }

            const value = Cardinals[key];

            const name = value.stringArray.join("");
            const pro = value.stringArray.join(" ").replace(
              /  /g,
              " ",
            );

            setName(name);
            setPronounce(pro);

            Speak({
              read: pro,
              voice_name,
            });
          }}
        />
      </fieldset>
      <fieldset
        onClick={(e) => {
          Speak({
            read: pronounce,
            voice_name,
          });
        }}
      >
        <legend>English name</legend>
        <textarea
          name="name"
          id="name"
          cols={30}
          rows={2}
          placeholder="ten"
          autocomplete="off"
          value={name}
        >
        </textarea>
        <textarea
          cols={30}
          rows={2}
          placeholder="pronounce"
          id="pronounce"
          autocomplete="off"
          value={pronounce}
        >
        </textarea>
      </fieldset>
    </main>
  );
};
