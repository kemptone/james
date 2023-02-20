import { useEffect, useState } from "preact/hooks";
import SpinSounds from "./spin.sounds.tsx";

const Fans =
  "Dumpy.png Fardo.png Lark.png Orange.png Cross.png Rat.png Metal_Girl.png colorfull.png dewalt.jpeg hote.jpeg makita1.jpg saw123.jpeg specialized.jpeg cactus.png flower.jpeg rose-glass.jpg triangles.webp cuaei.gif wheel.jpeg 2ff.gif circles.gif city.png cuaei.gif design.jpeg drawing-39.jpeg drawing2.jpeg drawing3.jpeg flower2.jpeg FUI.gif moving_wheel.gif radial.jpeg radial2.jpeg radial3.jpeg radial4.jpeg radial5.jpeg steer.jpeg symmetrical2.jpeg twist.gif wheel.jpeg"
    .split(" ");

export default (props: {}) => {
  const [state, setState] = useState("");
  const [totalTime, setTotalTime] = useState(10);
  const [totalRotations, setTotalRotations] = useState(6);
  const [currentFan, setCurrentFan] = useState("Dumpy.png");
  const [darkmode, setDarkmode] = useState(false);
  const [darkmode2, setDarkmode2] = useState(false);
  const [whitemode, setWhitemode] = useState(false);
  const [zoommode, setZoommode] = useState(false);
  const [zoomlevel, setZoomlevel] = useState("8");
  const [playSounds, setPlaySounds] = useState<() => void>(() => {});
  const [stopSounds, setStopSounds] = useState<() => void>(() => {});
  const [instance, setInstance] = useState(0);

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
    if (zoommode) {
      document?.body?.classList?.add("zoommode");
    } else {
      document?.body?.classList?.remove("zoommode");
    }
  }, [darkmode, darkmode2, whitemode, zoommode]);

  useEffect(() => {
    document?.body?.style?.setProperty?.(
      "--spintimer",
      totalTime + "s",
    );
    document?.body?.style?.setProperty?.(
      "--totalrotations",
      (360 * totalRotations) + "deg",
    );
    setInstance((prev) => prev + 1);
    setState("");
  }, [totalTime, totalRotations]);

  useEffect(() => {
    document?.body?.style?.setProperty?.(
      "--zoomlevel",
      `${(5 * Number(zoomlevel))}%`,
    );
  }, [zoomlevel]);

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
            }, 1900);
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
      <details className="control">
        <summary>Spin Settings</summary>
        <fieldset className="modes">
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
          <input
            type="checkbox"
            onChange={(e) => setZoommode(e?.currentTarget?.checked)}
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
        <fieldset>
          <legend>Zoom</legend>
          <input
            type="range"
            value={zoomlevel}
            onChange={(e) => setZoomlevel(e.currentTarget.value)}
          />
        </fieldset>
        {
          /* <button
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
        </button> */
        }
      </details>
    </>
  );
};
