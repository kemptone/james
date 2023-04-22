import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import useAudioLoop from "../hooks/useAudioLoop.tsx";
import type { AudioThing } from "../hooks/useAudioLoop.tsx";
import { loadReverb } from "../hooks/useReverb.tsx";
import AdjustableBlades from "../components/AdjustableBlades.tsx";
import Dialog from "../components/Dialog.tsx";
import OuterWrap from "../components/Timer/OuterWrap.tsx";
import RangeWithTicks from "../components/RangeWithTicks.tsx";
import { SettingItem } from "../components/SettingItem.tsx";
import {
  getValueFromRef,
  removeClassListItem,
  setBodyStyleProp,
  setClassListItem,
} from "../helpers/setBodyStyleProp.ts";

const InnerCore = ({
  Sounds,
}: { Sounds: AudioThing[] }) => {
  const refAudioContext = useRef<AudioContext | undefined>();
  const e_blades = useRef<HTMLInputElement | null>(null);
  const e_rate = useRef<HTMLInputElement | null>(null);
  const e_audioRate = useRef<HTMLInputElement | null>(null);
  const e_bladeScale = useRef<HTMLInputElement | null>(null);
  const e_bladeLineWidth = useRef<HTMLInputElement | null>(null);
  const e_opacity = useRef<HTMLInputElement | null>(null);
  const e_wait = useRef<HTMLInputElement | null>(null);
  const e_speedUp = useRef<HTMLInputElement | null>(null);
  const e_runTime = useRef<HTMLInputElement | null>(null);
  const e_slowDown = useRef<HTMLInputElement | null>(null);
  const e_outer = useRef<HTMLElement | null>(null);
  const e_spinner = useRef<HTMLDivElement | null>(null);
  const e_button = useRef<HTMLButtonElement | null>(null);
  const timerState = useRef<number>(0);
  const [bladeCount, setBladeCount] = useState(5);
  const [rate, setRate] = useState(1.5);
  const [audioRate, setAudioRate] = useState(1);
  const [buttonStatus, setButtonStatus] = useState("Start");

  useEffect(() => {
    if (
      e_runTime.current && e_slowDown.current && e_speedUp.current &&
      e_wait.current && e_blades.current && e_bladeScale.current &&
      e_rate.current && e_opacity.current && e_audioRate.current &&
      e_bladeLineWidth.current
    ) {
      e_runTime.current.value = "8";
      e_slowDown.current.value = "8";
      e_speedUp.current.value = "8";
      e_wait.current.value = "0";
      e_blades.current.value = "5";
      e_bladeScale.current.value = String(30 / 20);
      e_opacity.current.value = String(100);
      e_rate.current.value = String(1.5 * 20);
      e_audioRate.current.value = String(1 * 50);
      e_bladeLineWidth.current.value = String(20);
    }
  }, []);

  const startFan = useCallback(() => {
    if (
      e_runTime.current && e_slowDown.current && e_speedUp.current &&
      e_spinner.current && e_wait.current
    ) {
      removeClassListItem("started", e_outer);
      removeClassListItem("middle", e_outer);
      removeClassListItem("ending", e_outer);

      const FACTOR = .666; // Magic number
      const RATE = 1.5; // How many spins per second

      const [
        rotations_speedup,
        rotations_slowdown,
        rotations_runtime,
      ] = [
        Number(e_speedUp.current.value) * FACTOR * rate,
        Number(e_slowDown.current.value) * FACTOR * rate,
        Number(e_runTime.current.value) * rate,
        // Number(e_slowDown.current.value) * FACTOR * rate,
        // Number(e_runTime.current.value) * rate,
      ];

      setBodyStyleProp(
        "--speedup",
        String(Number(e_speedUp.current.value) || 0.01) + "s",
      );
      setBodyStyleProp(
        "--slowdown",
        String(Number(e_slowDown.current.value) || 0.01) + "s",
      );
      setBodyStyleProp(
        "--runtime",
        String(Number(e_runTime.current.value) || 0.01) + "s",
      );

      setBodyStyleProp(
        "--rotations_speedup",
        (360 * rotations_speedup) + "deg",
      );

      setBodyStyleProp(
        "--rotations_runtime",
        (360 * (rotations_runtime + rotations_speedup)) + "deg",
      );

      setBodyStyleProp(
        "--rotations_slowdown",
        (360 *
          Math.ceil(
            rotations_slowdown + rotations_runtime + rotations_speedup,
          )) +
          "deg",
      );

      timerState.current = 1;
      setClassListItem("started", e_outer);
    }
  }, [
    e_runTime.current,
    e_slowDown.current,
    e_speedUp.current,
    rate,
  ]);

  useEffect(() => {
    e_spinner?.current?.addEventListener(
      "transitionend",
      (e: TransitionEvent) => {
        console.log(timerState.current);

        if (timerState.current === 1) {
          removeClassListItem("started", e_outer);
          setClassListItem("middle", e_outer);
          timerState.current = 2;
          return;
        } else if (timerState.current === 2) {
          setClassListItem("ending", e_outer);
          removeClassListItem("middle", e_outer);
          timerState.current = 3;
          return;
        } else if (timerState.current === 3) {
          removeClassListItem("started", e_outer);
          removeClassListItem("middle", e_outer);
          removeClassListItem("ending", e_outer);
          timerState.current = 0;
          setButtonStatus("Start");
          return;
        }
      },
    );
  }, []);

  function runSpin() {
    if (timerState.current === 0 && e_wait.current && e_button.current) {
      if (e_wait?.current?.value) {
        const wait = Number(e_wait?.current?.value ?? "1");

        setButtonStatus("Waiting");

        setTimeout(
          run,
          wait * 1000,
        );
      } else {
        run();
      }
    } else if (e_button.current) {
      removeClassListItem("started", e_outer);
      removeClassListItem("middle", e_outer);
      removeClassListItem("ending", e_outer);
      timerState.current = 0;
      setButtonStatus("Start");
      Sounds.forEach((item) => {
        item.refStop.current();
      });
    }
  }

  function run() {
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
            if (source && context) {
              const rampUp = Number(getValueFromRef(e_speedUp, ".01"));
              const run = Number(getValueFromRef(e_runTime, ".01"));
              const slow = Number(getValueFromRef(e_slowDown, ".01"));

              source.playbackRate.setValueCurveAtTime(
                [0, .1, .3, .6, 1].map((i) =>
                  i * s.initialPlaybackRate * (rate * audioRate)
                ),
                context.currentTime,
                rampUp || 1,
              );

              source.playbackRate.setTargetAtTime(
                1 * s.initialPlaybackRate * (rate * audioRate),
                context.currentTime + rampUp,
                run || 1,
              );

              source.playbackRate.setValueCurveAtTime(
                [1, .9, .8, .7, .5, .3, .1, 0].map((i) =>
                  i * s.initialPlaybackRate * (rate * audioRate)
                ),
                context.currentTime + rampUp + run,
                slow || 1,
              );

              source.connect(gain);

              s.refPlay.current();

              source.stop(
                context.currentTime + rampUp + run + slow + 2,
              );

              setButtonStatus("Stop");
            }
          });
        });
      },
    );
  }

  console.count("render");

  return (
    <Dialog>
      {(D) => (
        <>
          <form
            action="javascript:void(0)"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              runSpin(e);
            }}
          >
            <main id="jamestimer" ref={e_outer}>
              <div className="innerwrap">
                <button type="submit" className="blades-wrap" ref={e_spinner}>
                  <AdjustableBlades bladeCount={bladeCount} />
                </button>
              </div>
              <footer>
                <div className="new-timer-section">
                  <SettingItem
                    name="speed"
                    type="number"
                    inputRef={e_rate}
                    onInput={(e) => {
                      const currentTarget = e.currentTarget; //  as HTMLInputElement;
                      if (currentTarget && currentTarget.value) {
                        setRate(Number(currentTarget.value) / 20);
                      }
                    }}
                  />

                  <SettingItem
                    name="blades"
                    type="number"
                    step={1}
                    inputRef={e_blades}
                    onInput={(e) => {
                      const target = e.currentTarget; // as HTMLInputElement;
                      const bladeCount = Math.min(Number(target.value), 7500);

                      if (bladeCount > 500) {
                        setClassListItem("darkmode2");
                      }
                      setBladeCount(bladeCount);
                    }}
                  />

                  <SettingItem
                    name="wait"
                    inputRef={e_wait}
                  />

                  <SettingItem
                    name="speed_up"
                    inputRef={e_speedUp}
                  />

                  <SettingItem
                    name="full_speed"
                    inputRef={e_runTime}
                  />

                  <SettingItem
                    name="slow_down"
                    inputRef={e_slowDown}
                  />

                  <button
                    ref={e_button}
                    type={"submit"}
                    children={buttonStatus}
                  />
                </div>
              </footer>
              <div id="timersettings" style={{ zIndex: 1000 }}>
                <button
                  style={{ margin: "10px" }}
                  type={"button"}
                  onClick={() => {
                    D.openDialog();
                  }}
                >
                  Settings
                </button>
              </div>
            </main>
          </form>
          <D.Dialog ref={D.ref}>
            <form>
              <RangeWithTicks
                legendText="Base Audio Frequency"
                inputRef={e_audioRate}
                onInput={({ currentTarget }) => {
                  setAudioRate(Number(currentTarget.value) / 50);
                }}
              />

              <RangeWithTicks
                legendText="Size of Fan"
                inputRef={e_bladeScale}
                onInput={({ currentTarget }) => {
                  setBodyStyleProp(
                    "--blade-scale",
                    String(Number(currentTarget.value) * 20),
                  );
                }}
              />

              <RangeWithTicks
                legendText="Line width"
                inputRef={e_bladeLineWidth}
                onInput={({ currentTarget }) => {
                  setBodyStyleProp(
                    "--stroke-width",
                    String(Number(currentTarget.value) / 1000),
                  );
                }}
              />

              <RangeWithTicks
                legendText="Opacity"
                inputRef={e_opacity}
                onInput={({ currentTarget }) => {
                  setBodyStyleProp(
                    "--opacity",
                    String(Number(currentTarget.value) / 100),
                  );
                }}
              />

              <fieldset>
                <legend>More Mystery Settings</legend>
                <input
                  type="checkbox"
                  onInput={(e: Event) => {
                    const target = e.currentTarget as HTMLInputElement;
                    if (target.checked) {
                      setClassListItem("darkmode");
                    } else {
                      removeClassListItem("darkmode");
                    }
                  }}
                />
                <input
                  type="checkbox"
                  onInput={(e: Event) => {
                    const target = e.currentTarget as HTMLInputElement;
                    if (target.checked) {
                      setClassListItem("darkmode2");
                    } else {
                      removeClassListItem("darkmode2");
                    }
                  }}
                />

                <input
                  type="checkbox"
                  onInput={(e: Event) => {
                    const target = e.currentTarget as HTMLInputElement;
                    if (target.checked) {
                      setClassListItem("whitemode");
                    } else {
                      removeClassListItem("whitemode");
                    }
                  }}
                />
              </fieldset>
            </form>
          </D.Dialog>
        </>
      )}
    </Dialog>
  );
};

export default OuterWrap({ InnerCore });
