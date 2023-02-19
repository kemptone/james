import { useEffect, useState } from "preact/hooks";
import runSpinSound from "../sounds/spinsounds.tsx";
import runSwooshSound from "../sounds/swooshsound.tsx";

const Fans =
  "Dumpy.png Fardo.png Lark.png Orange.png Cross.png Rat.png Metal_Girl.png"
    .split(" ");

const OnAnimationIteration = (doThis: () => void) => (e: Event) => {
  doThis();
};

export default (props: {}) => {
  const [state, setState] = useState("");
  const [totalTime, setTotalTime] = useState(10);
  const [totalRotations, setTotalRotations] = useState(6);
  const [currentFan, setCurrentFan] = useState("Dumpy.png");
  const [darkmode, setDarkmode] = useState(false);
  const [darkmode2, setDarkmode2] = useState(false);

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
  }, [darkmode, darkmode2]);

  useEffect(() => {
    document?.body?.style?.setProperty?.("--spintimer", totalTime + "s");
    document?.body?.style?.setProperty?.(
      "--totalrotations",
      (360 * totalRotations) + "deg",
    );
    setState("");
  }, [totalTime, totalRotations]);

  // useEffect(() => {
  //   if (state !== "spin") {
  //     return;
  //   }

  //   // runSpinSound(totalTime, totalRotations);
  //   // runSwooshSound(totalTime, totalRotations);
  // }, [state, totalTime, totalRotations]);

  return (
    <>
      <div className={`spinner ${state}`}>
        <img
          src={`/spin/${currentFan}`}
          onTransitionEnd={(e) => {
            setState("return");
            setTimeout((e) => {
              setState("");
            }, 100);
          }}
          onClick={(e) => {
            if (state) {
              setState("");
            } else {
              setState("spin");
              const context = new AudioContext();
              runSpinSound(totalTime, totalRotations, context);
              runSwooshSound(totalTime, totalRotations, context);
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
      </div>
    </>
  );
};
