import { useEffect, useState } from "preact/hooks";
import Dialog from "../components/Dialog.tsx";

const Primary =
  "Abby  Adaliz  Aiden  Angelo  Anthony  Bailey  Benny  Briana  Chase  Cierra  Cruz  Gustavo  Hudson  Iker  James  Kenia  Leilani  Lindsey  Melanie  Merryck  Michael  Sofia V  Sophia C"
    .split("  ");

const Secondary =
  "Beau, Gianna, Makenzie, Blake, Merlin, Santa Claus, Tooth Fairy, Audry, Braxton, Adley, Crista, Jake, Makayla, Atticus, Presly P, Alexis, Sophie, Mikey, Davey Jack, Hazel, Oliver, Lucas, Presly, Jackson, Aubrey, Elliot, Dumpy, Kevin"
    .split(", ");

// const Primary = [
//   "FF0000", // red
//   "FF7F00", // yellow
//   "FFFF00", // orange
//   "00FF00", // green
//   "0000FF",
//   "6A0DAD",
//   "FFFFFF",
//   "808080",
//   "000000",
//   "88540B",
//   "FFC0CB",
// ];

// console.log({ Primary, Secondary });

// console.log(
//   Primary.join(" is here..."),
// );

console.log(
  [...Primary, ...Secondary].join(" is here.\n"),
  // Secondary.join(" is here... "),
);

console.log(
  [...Primary, ...Secondary].join(" is absent.\n"),
  // Secondary.join(" is here... "),
);

export default () => {
  const [chosenNames, setChosenNames] = useState([]);

  // console.log({ chosenNames });

  return (
    <Dialog>
      {(D) => (
        <main class="colorthing">
          <section class="readout">
            {chosenNames.map((name, index) => (
              // <span class="chosen" key={index} children={{ name }} />
              <span class="chosen" children={name} />
            ))}
          </section>
          <section class="colors">
            {Primary.map((item, index) => (
              <button
                children={index + 1}
                key={item + index}
                onClick={(e) => {
                  setChosenNames(
                    [...chosenNames, item],
                  );
                }}
              />
            ))}

            <button
              children="⟵"
              onClick={(e) => {
                setChosenNames(
                  [...chosenNames].slice(0, chosenNames.length - 1),
                );
              }}
            />

            <button
              children="⏰"
              onClick={(e) => {
                setChosenNames(
                  [...chosenNames, `Daniel`],
                );
              }}
            />

            <button
              children="⏲"
              onClick={(e) => {
                setChosenNames(
                  [...chosenNames, `Mia`],
                );
              }}
            />

            <button
              children="🌗"
              onClick={D.openDialog}
            />

            <button
              children="♺"
              onClick={(e) => {
                setChosenNames([]);
              }}
            />
          </section>
          <D.Dialog ref={D.ref}>
            <main className="colorthing">
              <div class="colors">
                {Secondary.map((item, index) => (
                  <button
                    children={index + 1}
                    key={item + index}
                    onClick={(e) => {
                      setChosenNames(
                        [...chosenNames, item],
                      );
                    }}
                  />
                ))}
              </div>
            </main>
          </D.Dialog>
        </main>
      )}
    </Dialog>
  );
};
