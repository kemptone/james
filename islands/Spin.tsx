import { useEffect, useState } from "preact/hooks";
// import spinsounds from "../sounds/spinsounds.tsx";
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
  const [context, setContext] = useState<AudioContext | undefined>();
  const [sourceSwoosh, setSourceSwoosh] = useState<AudioBufferSourceNode>();
  const [sourceMain, setSourceMain] = useState<AudioBufferSourceNode>();

  function startSound() {
    const context = new AudioContext();
    setContext(context);

    fetch("/spin/swoop_206.mp3")
      .then((response) => response.arrayBuffer())
      .then((buffer) => context.decodeAudioData(buffer))
      .then((audioBuffer) => {
        const sourceSwoosh = runSpinSound(
          totalTime,
          totalRotations,
          context,
          audioBuffer,
        );
        setSourceSwoosh(sourceSwoosh);
        sourceSwoosh.start();
        // setSourceSwoosh(
        //   runSpinSound(totalTime, totalRotations, context, audioBuffer),
        // );
      });
    fetch("/spin/main_206.mp3")
      .then((response) => response.arrayBuffer())
      .then((buffer) => context.decodeAudioData(buffer))
      .then((audioBuffer) => {
        const sourceMain = runSwooshSound(
          totalTime,
          totalRotations,
          context,
          audioBuffer,
        );
        sourceMain.start();
        setSourceMain(sourceMain);
      });
  }

  function stopSound() {
  }

  useEffect(() => {
    console.log("useEffect");
    return () => {
      // context?.close();
    };
  }, []);

  useEffect(() => {
    // const context = new AudioContext();
    // setContext(context);

    // if (!context) {
    //   debugger;
    //   return;
    // }

    // fetch("/spin/swoop_206.mp3")
    //   .then((response) => response.arrayBuffer())
    //   .then((buffer) => context.decodeAudioData(buffer))
    //   .then((audioBuffer) => {
    //     setSourceSwoosh(
    //       runSpinSound(totalTime, totalRotations, context, audioBuffer),
    //     );
    //   });
    // fetch("/spin/main_206.mp3")
    //   .then((response) => response.arrayBuffer())
    //   .then((buffer) => context.decodeAudioData(buffer))
    //   .then((audioBuffer) => {
    //     runSwooshSound(totalTime, totalRotations, context, audioBuffer);
    //   });
  }, [totalTime, totalRotations, context]);

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

  return (
    <>
      <div className={`spinner ${state}`}>
        <img
          src={`/spin/${currentFan}`}
          onTransitionEnd={(e) => {
            setState("return");
            sourceSwoosh?.stop();
            sourceMain?.stop();
            context?.close();
            // context?.close();
            setTimeout((e) => {
              setState("");
              // setContext(new AudioContext());
            }, 100);
          }}
          onClick={(e) => {
            // setContext(new AudioContext());

            if (state) {
              setState("");
            } else {
              setState("spin");
              startSound();
              // sourceSwoosh?.start();
              // sourceMain?.start();
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
