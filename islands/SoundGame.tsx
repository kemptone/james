import { useCallback, useEffect, useId, useRef, useState } from "preact/hooks";
import { loadSoundFile } from "../utils/loadSoundFile.tsx"; // A helper function to load the sound file using Web Audio API
import Draggable from "../components/CustomDraggable.tsx";
import type { SoundItem } from "../types/NightNight.ts";
import { AllSounds } from "../utils/AllNightNightSounds.ts";
import NightNightButton from "../components/nightNight/NightNightButton.tsx";
import NightNightItem from "../components/nightNight/NightNightItem.tsx";

export default function SoundGamePage() {
  const [sounds, setSounds] = useState<SoundItem[]>([]);
  const [allOn, setAllOn] = useState(false);
  const [pageKey, setPageKey] = useState(123);

  const setAllOnCallback = useCallback(() => {
    setAllOn(!allOn);
    setPageKey(pageKey + 1);
  }, [allOn]);

  // Load the sound files when the component mounts
  useEffect(() => {
    const soundUrls = AllSounds.map((s) => `/night_night/${s}.wav`);
    const loadSounds = async () => {
      const audioContext = new (AudioContext || window.webKitAudioContext)();
      const buffers = await Promise.all(
        soundUrls.map((url) => loadSoundFile(audioContext, url)),
      );

      const yOffset = allOn ? 208 : 10;
      let jogger = 0;
      let yjogger = 1;

      const newSounds: SoundItem[] = buffers.map((buffer, index) => {
        const width = 80;
        const { outerHeight, outerWidth } = window;

        // const x = ((Math.random() * window.outerWidth) - 100) + 100;
        const y = allOn ? (yjogger * 100) + yOffset : (yjogger * 80) + yOffset;
        // const y = (Math.random() * (window.outerHeight - 240)) + 100;
        const x = (index - jogger) * width;

        if (x > outerWidth - width) {
          jogger = index + 1;
          yjogger++;
        }

        return ({
          buffer,
          x,
          y,
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Generate a random color for each box
          name: String(index + 1),
        });
      });
      setSounds(newSounds);
    };
    loadSounds();
  }, [allOn]);

  function handleBoxMove(index: number, newX: number, newY: number) {
    setSounds((prevSounds) =>
      prevSounds.map((sound, i) =>
        i === index ? { ...sound, x: newX, y: newY } : sound
      )
    );
  }

  function handleBoxDelete(index: number) {
    setSounds((prevSounds) => prevSounds.filter((_, i) => i !== index));
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      className="night-night"
    >
      <h1>Night Night, Sleep Tight</h1>
      <div key={pageKey}>
        {sounds.map((sound, i) => (
          <Draggable
            key={i}
            positionX={sound.x}
            positionY={sound.y}
            onMove={(newX, newY) => handleBoxMove(i, newX, newY)}
          >
            <NightNightItem {...{ symbol: sound.name, color: sound.color }} />
          </Draggable>
        ))}
      </div>
      <NightNightButton {...{ sounds, setAllOnCallback }} />
      <div className="playBox"></div>
      <div className="playBox2"></div>
    </div>
  );
}
