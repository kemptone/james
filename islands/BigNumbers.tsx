import { Head } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import { firstFive } from "../helpers/bignumbers/firstFive.js";
import { buildCardinals } from "../helpers/bignumbers/buildCardinals.js";

const Cardinals = [null, null, null, null, null, null];
buildCardinals(Cardinals);

export default (args) => {
  const [name, setName] = useState("");
  const [pronounce, setPronounce] = useState("");

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

            setName(value.stringArray.join(""));
            setPronounce(
              value.stringArray.join(" ").replace(
                /  /g,
                " ",
              ),
            );

            // P.e_name.value = value.stringArray.join("");
            // P.e_pronounce.value = value.stringArray.join(" ").replace(
            //   /  /g,
            //   " ",
            // );
          }}
        />
      </fieldset>
      <fieldset>
        <legend>English name</legend>
        <textarea
          name="name"
          id="name"
          cols="30"
          rows="2"
          placeholder="ten"
          autocomplete="off"
          value={name}
          // onClick="this.setSelectionRange(0, this.value.length)"
        >
        </textarea>
        <textarea
          cols="30"
          rows="2"
          placeholder="pronounce"
          id="pronounce"
          autocomplete="off"
          value={pronounce}
          // onClick="this.setSelectionRange(0, this.value.length)"
        >
        </textarea>
      </fieldset>
    </main>
  );
};
