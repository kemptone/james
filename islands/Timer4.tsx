import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import useAudioLoop from "../hooks/useAudioLoop.tsx";
import type { AudioThing } from "../hooks/useAudioLoop.tsx";
import { buildReverb, loadReverb } from "../hooks/useReverb.tsx";
import AdjustableBlades from "../components/AdjustableBlades.tsx";

const Test = () => {
  const refAudioContext = useRef<AudioContext | undefined>();
  const e_blades = useRef<HTMLInputElement | null>(null);
  const e_wait = useRef<HTMLInputElement | null>(null);
  const e_speedUp = useRef<HTMLInputElement | null>(null);
  const e_runTime = useRef<HTMLInputElement | null>(null);
  const e_slowDown = useRef<HTMLInputElement | null>(null);
  const e_outer = useRef<HTMLElement | null>(null);
  const e_spinner = useRef<HTMLDivElement | null>(null);
  const e_button = useRef<HTMLButtonElement | null>(null);
  const timerState = useRef<number>(0);
  const [bladeCount, setBladeCount] = useState(5);

  useEffect(() => {
    if (
      e_runTime.current && e_slowDown.current && e_speedUp.current &&
      e_wait.current
    ) {
      e_runTime.current.value = "8";
      e_slowDown.current.value = "8";
      e_speedUp.current.value = "8";
      e_wait.current.value = "0";
      e_blades.current.value = "5";
    }
  }, []);

  const startFan = useCallback(() => {
    if (
      e_runTime.current && e_slowDown.current && e_speedUp.current &&
      e_spinner.current && e_wait.current
    ) {
      e_outer?.current?.classList.remove("started");
      e_outer?.current?.classList.remove("middle");
      e_outer?.current?.classList.remove("ending");

      const FACTOR = .666; // Magic number
      const RATE = 1.5; // How many spins per second

      const [
        rotations_speedup,
        rotations_slowdown,
        rotations_runtime,
      ] = [
        Number(e_speedUp.current.value) * FACTOR * RATE,
        Number(e_slowDown.current.value) * FACTOR * RATE,
        Number(e_runTime.current.value) * RATE,
      ];

      document?.body?.style?.setProperty?.(
        "--speedup",
        e_speedUp.current.value + "s",
      );
      document?.body?.style?.setProperty?.(
        "--slowdown",
        e_slowDown.current.value + "s",
      );
      document?.body?.style?.setProperty?.(
        "--runtime",
        e_runTime.current.value + "s",
      );

      document?.body?.style?.setProperty?.(
        "--rotations_speedup",
        (360 * rotations_speedup) + "deg",
      );

      document?.body?.style?.setProperty?.(
        "--rotations_runtime",
        (360 * (rotations_runtime + rotations_speedup)) + "deg",
      );

      document?.body?.style?.setProperty?.(
        "--rotations_slowdown",
        (360 *
          Math.ceil(
            rotations_slowdown + rotations_runtime + rotations_speedup,
          )) +
          "deg",
      );

      timerState.current = 1;
      e_outer?.current?.classList.add("started");
    }
  }, [
    e_runTime.current,
    e_slowDown.current,
    e_speedUp.current,
  ]);

  useEffect(() => {
    e_spinner?.current?.addEventListener(
      "transitionend",
      (e: TransitionEvent) => {
        console.log(timerState.current);

        if (timerState.current === 1) {
          e_outer?.current?.classList.remove("started");
          e_outer?.current?.classList.add("middle");
          timerState.current = 2;
          return;
        } else if (timerState.current === 2) {
          e_outer?.current?.classList.remove("middle");
          e_outer?.current?.classList.add("ending");
          timerState.current = 3;
          return;
        } else if (timerState.current === 3) {
          e_outer?.current?.classList.remove("started");
          e_outer?.current?.classList.remove("middle");
          e_outer?.current?.classList.remove("ending");
          timerState.current = 0;
          if (e_button.current) {
            e_button.current.innerText = "Start";
          }
          return;
        }
      },
    );
  }, []);

  function runSpin(e: Event) {
    if (timerState.current === 0 && e_wait.current && e_button.current) {
      if (e_wait?.current?.value) {
        const wait = Number(e_wait?.current?.value ?? "1");

        e_button.current.innerText = "Waiting";

        setTimeout(
          run.bind(undefined, e),
          wait * 1000,
        );
      } else {
        run(e);
      }
    } else if (e_button.current) {
      e_outer?.current?.classList.remove("started");
      e_outer?.current?.classList.remove("middle");
      e_outer?.current?.classList.remove("ending");
      timerState.current = 0;
      e_button.current.innerText = "Start";
      Sounds.forEach((item) => {
        item.refStop.current();
      });
    }
  }

  function run(e: Event) {
    const target = e.target as HTMLButtonElement;

    startFan();

    let context = refAudioContext.current;

    if (!context) {
      context =
        refAudioContext.current =
          new (window.AudioContext || window.webkitAudioContext)();
    }

    // This is fixing an issue that shows up on Safari
    if (context.state === "suspended") {
      context.resume();
    }

    loadReverb("/impulse/reaperblog/IRx1000_03C.wav", context).then(
      (reverb) => {
        if (!context) {
          context =
            refAudioContext.current =
              new (window.AudioContext ||
                window.webkitAudioContext)();
        }

        const gain = new GainNode(context);
        gain.gain.value = .125;

        reverb.connect(context.destination);

        gain.connect(reverb);

        Sounds.forEach((s) => {
          if (!context) {
            return;
          }

          useAudioLoop(s, context, ({ source }) => {
            const SPEED = 4;

            if (source && context) {
              const rampUp = Number(e_speedUp?.current?.value);
              const run = Number(e_runTime?.current?.value);
              const slow = Number(e_slowDown?.current?.value);

              source.playbackRate.setValueCurveAtTime(
                [0, .1, .3, .6, 1].map((i) => i * s.initialPlaybackRate),
                context.currentTime,
                rampUp,
              );

              source.playbackRate.setTargetAtTime(
                1 * s.initialPlaybackRate,
                context.currentTime + rampUp,
                run,
              );

              source.playbackRate.setValueCurveAtTime(
                [1, .9, .8, .7, .5, .3, .1, 0].map((i) =>
                  i * s.initialPlaybackRate
                ),
                context.currentTime + rampUp + run,
                slow,
              );

              // source.addEventListener("ended", (listener) => {
              //   // debugger;
              // });

              source.connect(gain);

              s.refPlay.current();

              source.stop(
                context.currentTime + rampUp + run + slow + 2,
              );

              target.innerText = "Stop";
            }
          });
        });
      },
    );
  }

  const Sounds: AudioThing[] = [
    {
      audioFile: "/spin/fans/00.wav",
      initialPlaybackRate: .5,
      refSourceNode: useRef<AudioBufferSourceNode | null>(),
      refPlaying: useRef(false),
      refPlay: useRef(() => undefined),
      refStop: useRef(() => undefined),
      refLoaded: useRef(false),
    },
    {
      audioFile: "/spin/fans/01.wav",
      initialPlaybackRate: 1,
      refSourceNode: useRef<AudioBufferSourceNode | null>(),
      refPlaying: useRef(false),
      refPlay: useRef(() => undefined),
      refStop: useRef(() => undefined),
      refLoaded: useRef(false),
    },
    {
      audioFile: "/spin/fans/08.wav",
      initialPlaybackRate: .25,
      refSourceNode: useRef<AudioBufferSourceNode | null>(),
      refPlaying: useRef(false),
      refPlay: useRef(() => undefined),
      refStop: useRef(() => undefined),
      refLoaded: useRef(false),
    },
  ];

  return (
    <>
      <main id="jamestimer" ref={e_outer}>
        <header>
          <div className="blades-wrap" ref={e_spinner}>
            <AdjustableBlades bladeCount={bladeCount} />
          </div>
          {
            /* <div class="controls">
            <img
              id="spinner"
              src="/timer/spinners/25428-200.png"
              ref={e_spinner}
            />
          </div> */
          }
        </header>
        <footer>
          <div className="new-timer-section">
            <div>
              <div>Blades:</div>
              <input
                type="number"
                step="1"
                ref={e_blades}
                onChange={(e: Event) => {
                  const target = e.target as HTMLInputElement;
                  setBladeCount(Number(target.value));
                }}
              />
            </div>

            <div>
              <div>Wait:</div>
              <input
                type="number"
                step="0.1"
                ref={e_wait}
              />
            </div>

            <div>
              <div>Speed up:</div>
              <input
                type="number"
                step="0.1"
                ref={e_speedUp}
              />
            </div>

            <div>
              <div>Full speed:</div>
              <input
                type="number"
                step="0.1"
                ref={e_runTime}
              />
            </div>

            <div>
              <div>Slow Down:</div>
              <input
                type="number"
                step="0.1"
                ref={e_slowDown}
              />
            </div>

            <button
              ref={e_button}
              onClick={runSpin}
            >
              Start
            </button>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Test;
