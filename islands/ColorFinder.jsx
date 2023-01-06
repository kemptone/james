import { useEffect, useState } from "preact/hooks";
import { onPickerChange } from "../helpers/colorFinder.helper.js";

const def = {
  "hex": "B2FFFF",
  "colorName": "Celeste",
  "rgb": {
    "r": 179,
    "g": 255,
    "b": 255,
  },
};

const Info = (data, name) => (
  <span>
    {data && <span>{name}</span>}
    <strong>{data}</strong>
  </span>
);

export default () => {
  const [chosenColor, setChosenColors] = useState(def);
  const [allColors, setAllColors] = useState([]);

  useEffect(async () => {
    const response = await fetch("/colors.json", {});
    const data = await response.json();
    setAllColors(data);
  }, []);

  return (
    <main class="colorfinder">
      <section class="colors">
        {Info(chosenColor.hex, "hex")}
        {Info(chosenColor.colorName, "Name")}
        {Info(chosenColor?.rgb?.r, "Red")}
        {Info(chosenColor?.rgb?.g, "Green")}
        {Info(chosenColor?.rgb?.b, "Blue")}
        {
          /* {Info(chosenColor.rgb.r)}
        {Info(chosenColor.rgb.g)}
        {Info(chosenColor.rgb.b)} */
        }
      </section>
      <section class="picker">
        <input
          type="color"
          name="color"
          onChange={onPickerChange(allColors, setChosenColors)}
          value={"#" + chosenColor.hex}
        />
        <div
          class="example"
          style={chosenColor.hex
            ? {
              backgroundColor: "#" + chosenColor.hex,
            }
            : undefined}
        >
        </div>
      </section>
    </main>
  );
};
