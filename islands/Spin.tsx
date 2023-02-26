import { useEffect, useState } from "preact/hooks";
import SpinSounds from "./spin.sounds.tsx";
import Dialog from "../components/Dialog.tsx";
import Recorder from "./Recorder.tsx";

const Fans =
  "Dumpy.png Fardo.png Lark.png Orange.png Cross.png Rat.png Metal_Girl.png colorfull.png dewalt.jpeg hote.jpeg makita1.jpg saw123.jpeg specialized.jpeg cactus.png flower.jpeg rose-glass.jpg triangles.webp cuaei.gif wheel.jpeg 2ff.gif circles.gif city.png cuaei.gif design.jpeg drawing-39.jpeg drawing2.jpeg drawing3.jpeg flower2.jpeg FUI.gif moving_wheel.gif radial.jpeg radial2.jpeg radial3.jpeg radial4.jpeg radial5.jpeg steer.jpeg symmetrical2.jpeg twist.gif wheel.jpeg Cowardly_lion2.jpeg dorothy.jpeg abstract-colorful.jpeg arrows.png circle-08.gif dewalt2.jpeg glinda.jpeg woz-group.jpeg tin-man.jpeg glinda2.avif"
    .split(" ");

interface Recording {
  audioURL: string;
  timestamp: number;
  id: number;
}

export default (props: {}) => {
  const [state, setState] = useState("");
  const [totalTime, setTotalTime] = useState(10);
  const [totalRotations, setTotalRotations] = useState(6);
  const [transitionType, setTransitionType] = useState("ease");
  const [currentFan, setCurrentFan] = useState("Fardo.png");
  const [volume, setVolume] = useState(50);
  const [darkmode, setDarkmode] = useState(false);
  const [darkmode2, setDarkmode2] = useState(false);
  const [whitemode, setWhitemode] = useState(false);
  const [zoommode, setZoommode] = useState(false);
  const [zoomlevel, setZoomlevel] = useState("8");
  const [playSounds, setPlaySounds] = useState<() => void>(() => {});
  const [stopSounds, setStopSounds] = useState<() => void>(() => {});
  const [instance, setInstance] = useState(0);
  const [allstop, setAllStop] = useState(0);
  const [customAudio1, setCustomAudio1] = useState<string>();
  const [customAudio2, setCustomAudio2] = useState<string>();

  useEffect(() => {
    setState("return");
    setTimeout((e) => {
      setState("");
      // stopSounds();
    }, 100);
  }, [allstop]);

  useEffect(() => {
    const audioContext =
      new (window.AudioContext || window.webkitAudioContext)();
    const Spins = SpinSounds(
      volume,
      audioContext,
      totalTime,
      totalRotations,
      customAudio1,
      customAudio2,
    );
    setPlaySounds(() => Spins.playSounds);
    setStopSounds(() => Spins.stopSounds);
    return () => {
      audioContext.close();
    };
  }, [
    totalRotations,
    totalTime,
    instance,
    allstop,
    customAudio1,
    customAudio2,
    volume,
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
    document?.body?.style?.setProperty?.(
      "--transitionType",
      transitionType,
    );
    setInstance((prev) => prev + 1);
    setState("");
  }, [totalTime, totalRotations, transitionType]);

  useEffect(() => {
    document?.body?.style?.setProperty?.(
      "--zoomlevel",
      `${(8 * Number(zoomlevel))}%`,
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
      <details className="control" open>
        <summary>Settings</summary>
        <fieldset className="modes">
          <legend>modes</legend>
          <input
            type="checkbox"
            title="dark mode"
            onChange={(e) => setDarkmode(e?.currentTarget?.checked)}
          />
          <input
            type="checkbox"
            title="invert fan"
            onChange={(e) => setDarkmode2(e?.currentTarget?.checked)}
          />
          <input
            type="checkbox"
            title="white mode"
            onChange={(e) => setWhitemode(e?.currentTarget?.checked)}
          />
          <input
            type="checkbox"
            title="zoom fan"
            checked={zoommode === true ? true : undefined}
            onChange={(e) => setZoommode(e?.currentTarget?.checked)}
            name="zoommode"
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

        <details>
          <summary>More</summary>

          <fieldset>
            <legend>Easing</legend>

            <select
              onChange={(e) => setTransitionType(e.currentTarget.value)}
              defaultValue={currentFan}
            >
              {"ease linear ease-in ease-out ease-in-out ".split(" ").map((
                type,
              ) => <option value={type}>{type}</option>)}
            </select>
          </fieldset>
          <fieldset>
            <legend>Zoom</legend>
            <input
              type="range"
              value={zoomlevel}
              onChange={(e) => {
                setZoommode(true);
                setZoomlevel(e.currentTarget.value);
              }}
              min=".1"
              step="any"
            />
          </fieldset>
          <fieldset>
            <legend>Volume ({(2 * volume).toFixed(2)}%)</legend>
            <input
              type="range"
              value={volume}
              onChange={(e) => setVolume(Number(e.currentTarget.value))}
              min=".01"
              step="any"
            />
          </fieldset>
        </details>

        <Dialog>
          {(D) => (
            <fieldset className="more-actions">
              <button
                onClick={(e) => {
                  setAllStop((prev) => prev + 1);
                  setState("return");
                  setTimeout(() => {
                    setState("");
                  }, 100);
                }}
                children="Stop"
              />
              <button
                onClick={D.openDialog}
                children="Edit Sounds"
              />
              <D.Dialog ref={D.ref}>
                <Recorder
                  setAsSound={setCustomAudio1}
                  setAsSound2={setCustomAudio2}
                />
              </D.Dialog>
            </fieldset>
          )}
        </Dialog>
      </details>
    </>
  );
};
