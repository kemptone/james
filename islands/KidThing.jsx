import { useEffect, useState } from "preact/hooks";

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
          children=" "
          onClick={(e) => {
            setChosenNames(
              [...chosenNames, `Daniel`],
            );
          }}
        />

        <button
          children=" "
          onClick={(e) => {
            setChosenNames(
              [...chosenNames, `Bo`],
            );
          }}
        />

        <button
          children=" "
          onClick={(e) => {
            setChosenNames(
              [...chosenNames, `Gianna`],
            );
          }}
        />

        <button
          children=" "
          onClick={(e) => {
            setChosenNames(
              [...chosenNames, `Makenzie`],
            );
          }}
        />

        <button
          children=" "
          onClick={(e) => {
            setChosenNames(
              [...chosenNames, `Blake`],
            );
          }}
        />

        <button
          children=" "
          onClick={(e) => {
            setChosenNames(
              [...chosenNames, `Merlin`],
            );
          }}
        />

        <button
          children=" "
          onClick={(e) => {
            setChosenNames(
              [...chosenNames, `Santa Clause`],
            );
          }}
        />

        <button
          children=" "
          onClick={(e) => {
            setChosenNames(
              [...chosenNames, `Dumpy`],
            );
          }}
        />

        <button
          children=" "
          onClick={(e) => {
            setChosenNames(
              [...chosenNames, `Audry`],
            );
          }}
        />

        <button
          children=" "
          onClick={(e) => {
            setChosenNames(
              [...chosenNames, `Braxton`],
            );
          }}
        />

        <button
          children="♺"
          onClick={(e) => {
            setChosenNames([]);
          }}
        />
      </section>
    </main>
  );
};
