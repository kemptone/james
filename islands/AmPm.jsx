import { useEffect, useState } from "preact/hooks";
import Dialog from "../components/Dialog.tsx";

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
  const [showingMissing, setShowingMissing] = useState(false);

  // console.log({ chosenNames });

  return (
    <Dialog>
      {(D2) => (
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
                  children="⏲"
                  onClick={(e) => {
                    D2.openDialog();
                  }}
                />

                <button
                  children="🌗"
                  onClick={(e) => {
                    D.openDialog();
                  }}
                />

                <button
                  children="♺"
                  onClick={(e) => {
                    setChosenNames([]);
                  }}
                />
              </section>
              <D2.Dialog ref={D2.ref}>
                <main className="colorthing">
                  <div className="readout">
                    {Primary.filter((name) =>
                      chosenNames.join("::").indexOf(name) === -1
                    ).map((name) => <span className="chosen">{name}</span>)}
                  </div>
                </main>
              </D2.Dialog>

              <D.Dialog ref={D.ref}>
                <main className="colorthing">
                  <section className="inner-readout">
                    {showingMissing
                      ? chosenNames.map((name, index) => (
                        // <span class="chosen" key={index} children={{ name }} />
                        <span class="chosen" children={name} />
                      ))
                      : null}
                  </section>

                  <div class="colors">
                    <button
                      onClick={(e) => setShowingMissing(!showingMissing)}
                    >
                      ?
                    </button>
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
      )}
    </Dialog>
  );
};
