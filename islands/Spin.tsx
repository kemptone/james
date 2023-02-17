import { useEffect, useState } from "preact/hooks";
import Dialog from "../components/Dialog.tsx";

const OnAnimationIteration = (doThis: () => void) => (e: Event) => {
  doThis();
};

export default (props: {}) => {
  const [state, setState] = useState("");
  const [totalTime, setTotalTime] = useState(10);
  const [totalRotations, setTotalRotations] = useState(6);

  useEffect(() => {
    document?.body?.style?.setProperty?.("--spintimer", totalTime + "s");
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
          src="/img_489522.png"
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
            }
          }}
        />
      </div>
      <div className="control">
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
