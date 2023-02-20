import { useEffect, useState } from "preact/hooks";
import SpinSounds from "./spin.sounds.tsx";

const Fans =
  "Dumpy.png Fardo.png Lark.png Orange.png Cross.png Rat.png Metal_Girl.png colorfull.png dewalt.jpeg hote.jpeg makita1.jpg saw123.jpeg specialized.jpeg"
    .split(" ");

export default (props: {}) => {
  const [state, setState] = useState("");
  const [totalTime, setTotalTime] = useState(10);
  const [totalRotations, setTotalRotations] = useState(6);
  const [currentFan, setCurrentFan] = useState("Dumpy.png");
  const [darkmode, setDarkmode] = useState(false);
  const [darkmode2, setDarkmode2] = useState(false);
  const [whitemode, setWhitemode] = useState(false);
  const [playSounds, setPlaySounds] = useState<() => void>(() => {});
  const [stopSounds, setStopSounds] = useState<() => void>(() => {});
  const [instance, setInstance] = useState(0);
  // const [context, setContext] = useState<AudioContext | undefined>();
  // const [sourceSwoosh, setSourceSwoosh] = useState<AudioBufferSourceNode>();
  // const [sourceMain, setSourceMain] = useState<AudioBufferSourceNode>();

  useEffect(() => {
    const audioContext =
      new (window.AudioContext || window.webkitAudioContext)();
    const Spins = SpinSounds(audioContext, totalTime, totalRotations);
    setPlaySounds(() => Spins.playSounds);
    setStopSounds(() => Spins.stopSounds);
    return () => {
      audioContext.close();
    };
  }, [
    totalRotations,
    totalTime,
    instance,
  ]);

  useEffect(() => {
    if (darkmode) {
      document?.body?.classList?.add("darkmode");
    } else {
      document?.body?.classList?.remove("darkmode");
    }
    if (darkmode2) {
      document?.body?.classList?.add("darkmode2");
    } else {
      document?.body?.classList?.remove("darkmode2");
    }
    if (whitemode) {
      document?.body?.classList?.add("whitemode");
    } else {
      document?.body?.classList?.remove("whitemode");
    }
  }, [darkmode, darkmode2, whitemode]);

  useEffect(() => {
    document?.body?.style?.setProperty?.(
      "--spintimer",
      totalTime + "s",
    );
    document?.body?.style?.setProperty?.(
      "--totalrotations",
      (360 * totalRotations) + "deg",
    );
    setState("");
  }, [totalTime, totalRotations]);

  return (
    <>
      <div className={`spinner ${state}`}>
        <img
          src={`/spin/${currentFan}`}
          onTransitionEnd={(e) => {
            setState("return");
            setTimeout((e) => {
              setState("");
              stopSounds();
            }, 100);
            setTimeout((e) => {
              setInstance((prev) => prev + 1);
            }, 1000);
          }}
          onClick={(e) => {
            if (state) {
              setState("");
            } else {
              setState("spin");
              playSounds();
            }
          }}
        />
      </div>
      <div className="control">
        <fieldset>
          <legend>darkmode</legend>
          <input
            type="checkbox"
            onChange={(e) => setDarkmode(e?.currentTarget?.checked)}
          />
          <input
            type="checkbox"
            onChange={(e) => setDarkmode2(e?.currentTarget?.checked)}
          />
          <input
            type="checkbox"
            onChange={(e) => setWhitemode(e?.currentTarget?.checked)}
          />
        </fieldset>

        <fieldset>
          <legend>Fan</legend>
          <select
            onChange={(e) => setCurrentFan(e.currentTarget.value)}
            defaultValue={currentFan}
          >
            {Fans.map((fan) => <option value={fan}>{fan}</option>)}
          </select>
        </fieldset>
        <fieldset>
          <legend>Time, in seconds</legend>
          <input
            type="number"
            value={totalTime}
            onChange={(e) => setTotalTime(Number(e.currentTarget.value))}
          />
        </fieldset>
        <fieldset>
          <legend>Rotations</legend>
          <input
            type="number"
            value={totalRotations}
            onChange={(e) => setTotalRotations(Number(e.currentTarget.value))}
          />
        </fieldset>
        <button
          onClick={(e) => {
            if (state) {
              setState("");
            } else {
              setState("spin");
              playSounds();
            }
          }}
        >
          Start
        </button>
      </div>
    </>
  );
};
