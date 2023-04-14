import { MutableRef } from "preact/hooks";

type Note = {
  name: string;
  frequency: number;
};

const Notes: Note[] = [];

// creates an array of note frequencies
// from the given base frequency
const createFrequencies = (base: number, number: number) => {
  const notes = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ];
  const frequencies: Note[] = [];
  for (let i = 0; i < 12; i++) {
    frequencies.push({
      frequency: base * Math.pow(2, i / 12),
      name: number + ":" + notes[i],
    });
  }
  return frequencies;
};

Notes.push(...createFrequencies(27.5, 0));
Notes.push(...createFrequencies(55, 1));
Notes.push(...createFrequencies(110, 2));
Notes.push(...createFrequencies(220, 3));
Notes.push(...createFrequencies(440, 4));
Notes.push(...createFrequencies(880, 5));
Notes.push(...createFrequencies(1760, 6));
Notes.push(...createFrequencies(3520, 7));
Notes.push(...createFrequencies(7040, 8));

export default ({
  e_frequency,
  r_frequency,
}: {
  e_frequency: MutableRef<HTMLInputElement | null>;
  r_frequency: MutableRef<number>;
}) => {
  return (
    <section class="change-note">
      {Notes.map((note) => (
        <button
          type={"button"}
          onClick={(e) => {
            e.preventDefault();
            r_frequency.current = note.frequency;
            if (e_frequency.current) {
              e_frequency.current.value = String(
                Math.round(note.frequency * 1000) / 1000,
              );
            }
          }}
          children={note.name}
        />
      ))}
    </section>
  );
};
