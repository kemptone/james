import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import { loadSoundFile } from "../utils/loadSoundFile.tsx"; // A helper function to load the sound file using Web Audio API
import { AudioBox } from "../components/AudioBox.tsx";

type SoundItem = {
  buffer: AudioBuffer;
  x: number;
  y: number;
  color: string;
  name: string;
};

const AllSounds = `
001_night_night.wav
002_sleep_tight.wav
003_dont_let_the_bed_bugs_bite.wav
004_see_you_later.wav
005_see_you_later_aligator.wav
006_in_a_while_crockodile.wav
007_not_if_I_dont_see_you_first.wav
008_ok.wav
009_I_love_you.wav
010_I_sawsue.wav
011_vasbedonia.wav
012_adios.wav
013_adios_muchachos.wav
014_ok2.wav
015_pleasant_dreams.wav
016_goodnight_pebbels.wav
017_goodnight_roxie.wav
018_goodnight_skip.wav
019_goodnight_turkey.wav
020_goodnight_mommy.wav
021_goodnight_daddy.wav
022_goodnight_grandma_and_grandpa.wav
023_goodnight_my_love.wav
024_goodnight_sweet_prince.wav
025_ok_then.wav
026_pleasant_dreams_I_love_you.wav
027_good_night.wav
028_pleasant_dreams_b.wav
029_good_day_sir.wav
030_I_said_good_day_sir.wav
`.replaceAll(" ", "").replaceAll("\n", "").split(".wav").filter((s) =>
  s !== ""
);

export default function SoundGamePage() {
  const [sounds, setSounds] = useState<SoundItem[]>([]);
  const [allOn, setAllOn] = useState(false);

  const setAllOnCallback = useCallback(() => {
    setAllOn(!allOn);
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
      <div>
        {sounds.map((sound, i) => (
          <AudioBox
            key={i}
            color={sound.color}
            symbol={`${sound.name}`} // Use the index as the symbol for now, but you can change this as needed
            x={sound.x}
            y={sound.y}
            onMove={(newX, newY) => handleBoxMove(i, newX, newY)}
            onDelete={() => handleBoxDelete(i)}
          />
        ))}
      </div>
      <PlayButton {...{ sounds, setAllOnCallback }} />
      <div className="playBox"></div>
      <div className="playBox2"></div>
    </div>
  );
}

type PlayButtonProps = {
  sounds: SoundItem[];
  setAllOnCallback: () => void;
};

function PlayButton({ sounds, setAllOnCallback }: PlayButtonProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodesRef = useRef<AudioBufferSourceNode[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Create the audio context when the component mounts
  useEffect(() => {
    audioContextRef.current = new AudioContext();
  }, []);

  function handlePlay() {
    if (isPlaying) return;

    setIsPlaying(true);
    sourceNodesRef.current = [];

    // Create a new buffer source node for each sound and connect it to the audio context

    const chunky1 = sounds.filter((a) => {
      return a.y > 300 && a.y < 400;
    }).sort((a, b) => {
      return a.x - b.x;
    });

    const chunky2 = sounds.filter((a) => {
      return a.y > 400 && a.y < 500;
    }).sort((a, b) => {
      return a.x - b.x;
    });

    [...chunky1, ...chunky2].forEach((sound) => {
      // sounds.forEach((sound) => {
      const sourceNode = audioContextRef.current?.createBufferSource();
      if (!sourceNode) return;

      sourceNode.buffer = sound.buffer;

      if (audioContextRef.current?.destination) {
        sourceNode.connect(audioContextRef.current?.destination);
        sourceNodesRef.current.push(sourceNode);
      }
    });

    // Schedule each buffer source node to play in sequence
    sourceNodesRef.current.forEach((current, index, arr) => {
      const next = arr[index + 1];
      if (next) {
        current.onended = () => {
          next.start();
        };
      } else {
        current.onended = () => {
          handleStop();
        };
      }
    });
    // sourceNodesRef.current.reduce((prevNode, curNode) => {
    //   prevNode.onended = () => {
    //     debugger;
    //     if (curNode) {
    //       curNode.start();
    //     } else {
    //       handleStop();
    //     }
    //   };
    //   return curNode;
    // });

    sourceNodesRef.current[0].start();
  }

  function handleStop() {
    setIsPlaying(false);
    if (!isPlaying) return;

    // Stop all buffer source nodes
    sourceNodesRef.current.forEach((node) => {
      // node?.stop?.();
      node?.disconnect?.();
    });
  }

  return (
    <div className="game-button">
      <div style={{ marginTop: "1em" }}>
        {isPlaying
          ? <button onClick={handleStop}>Stop</button>
          : <button onClick={handlePlay}>Play</button>}
        <button onClick={setAllOnCallback}>All On</button>
      </div>
    </div>
  );
}
