import { useEffect, useState } from "preact/hooks";
import Dialog from "../components/Dialog.tsx";

const Primary =
  "Abby  Adaliz  Aiden  Angelo  Anthony  Bailey  Benny  Briana  Chase  Cierra  Cruz  Gustavo  Hudson  Iker  James  Kenia  Leilani  Lindsey  Melanie  Merryck  Michael  Sofia V  Sophia C"
    .split("  ");

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

console.log(Primary);

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
                <button
                  children="♞"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Beau`],
                    );
                  }}
                />

                <button
                  children="⛱"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Gianna`],
                    );
                  }}
                />

                <button
                  children="💃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Makenzie`],
                    );
                  }}
                />

                <button
                  children="🏂"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Blake`],
                    );
                  }}
                />

                <button
                  children="🗿"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Merlin`],
                    );
                  }}
                />

                <button
                  children="🎅"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Santa Claus`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Tooth Fairy`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Audry`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Braxton`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Adley`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Crista`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Jake`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Makayla`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Atticus`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Presly P`],
                    );
                  }}
                />

                <button
                  children="⭐"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Alexis`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Sophie`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Mikey`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Davey Jack`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Hazel`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Oliver`],
                    );
                  }}
                />

                <button
                  children="⚾"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Lucas`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Presly`],
                    );
                  }}
                />

                <button
                  children="🏈"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Jackson`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Aubrey`],
                    );
                  }}
                />

                <button
                  children="🙃"
                  onClick={(e) => {
                    setChosenNames(
                      [...chosenNames, `Elliot`],
                    );
                  }}
                />
              </div>
            </main>
          </D.Dialog>
        </main>
      )}
    </Dialog>
  );
};
