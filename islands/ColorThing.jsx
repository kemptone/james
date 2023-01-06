import { useEffect, useState } from "preact/hooks";

const Primary = [
  "FF0000",
  "FF7F00",
  "FFFF00",
  "0000FF",
  "6A0DAD",
  "FFFFFF",
  "808080",
  "000000",
  "88540B",
  "FFC0CB",
];

export default () => {
  const [chosenColors, setChosenColors] = useState([]);
  return (
    <main class="colorthing">
      <section class="readout">
        {chosenColors.map((backgroundColor) => (
          <span class="chosen" style={{ backgroundColor }}></span>
        ))}
      </section>
      <section class="colors">
        {Primary.map((item, index) => (
          <button
            children={index + 1}
            onClick={(e) => {
              setChosenColors(
                [...chosenColors, `#${item}`],
              );
            }}
          />
        ))}
      </section>
    </main>
  );
};
