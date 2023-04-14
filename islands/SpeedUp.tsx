import { useCallback, useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import useAudioSoundLoop from "../hooks/useAudioSoundLoop.tsx";
import Dialog from "../components/Dialog.tsx";

const Cs = 32.70;
const C = 261.63;

let LastContext: AudioContext;
let allStop: () => void;

const SettingItem = ({
  name,
  type = "number",
}: {
  name: string;
  type?: "number" | "text";
}) => {
  return (
    <label class="setting-item">
      <span>{name}</span>
      <input
        name={name}
        type={type}
        step={type === "number" ? "0.001" : undefined}
      />
    </label>
  );
};

// formats number with leading zeros
function formatNumber(n: number) {
  return n < 10 ? `0${n}` : n;
}

// formats a number with up to 2 leading zeros
function formatNumber2(n: number) {
  return n < 10 ? `00${n}` : n < 100 ? `0${n}` : n;
}

// formats a number, which is in miliseconds as a timer string, with hours, minutes, and seconds, and milliseconds
const formatTimer = (timer: number) => {
  const hours = Math.floor(timer / 3600000);
  const minutes = Math.floor((timer % 3600000) / 60000);
  const seconds = Math.floor((timer % 60000) / 1000);
  const ms = Math.floor(timer % 1000);
  return `${formatNumber(hours)}:${formatNumber(minutes)}:${
    formatNumber(seconds)
  }.${formatNumber2(ms)}`;
};

export default () => {
  const [running, setRunning] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [delay, setDelay] = useState<number>(0);
  const r_frequency = useRef<number>(Cs);
  const r_timeout = useRef<number>();
  const r_delay = useRef<number>();
  const r_length = useRef<number>();

  const WaitingSound = useAudioSoundLoop({
    frequency: r_frequency.current * 1,
    length: 5,
    type: "sine",
  });

  const WaitingSound2 = useAudioSoundLoop({
    frequency: r_frequency.current * 1.5,
    length: 5,
    type: "sine",
  });

  const CounterSound = useAudioSoundLoop({
    // frequency: Cs * 3,
    frequency: r_frequency.current * 3,
    length: 0.5,
    type: "sine",
  });

  const StartSound = useAudioSoundLoop({
    // frequency: Cs * 2,
    frequency: r_frequency.current * 2,
    length: 1,
    type: "triange",
  });

  const EndingSound = useAudioSoundLoop({
    frequency: r_frequency.current * 1,
    length: 1,
    type: "sine",
  });

  const EndingSound2 = useAudioSoundLoop({
    frequency: r_frequency.current * 1.5,
    length: 1,
    type: "sine",
  });

  // formats a number as a timer string, with hours, minutes, and seconds

  const onFormSubmit = useCallback(
    (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
      e.preventDefault();

      if (LastContext?.state === "running") {
        LastContext?.close();
      }

      const audioCtx = LastContext =
        new (window.AudioContext || window.webkitAudioContext)();

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const _delay = Number(formData.get("delay"));
      const _length = Number(formData.get("length"));

      setDelay(_delay);

      clearInterval(r_timeout.current);
      clearInterval(r_delay.current);
      clearInterval(r_length.current);

      if (running) {
        setRunning(false);
        return;
      }

      setRunning(true);

      if (_delay) {
        WaitingSound.start(audioCtx, _delay, r_frequency.current * 1);
        WaitingSound2.start(audioCtx, _delay, r_frequency.current * 1.5);
      }

      r_delay.current = setTimeout(() => {
        const startTime = Date.now();
        let lastSecond = 0;
        r_timeout.current = setInterval(function () {
          const elapsedTime = Date.now() - startTime;
          setTimer(elapsedTime);
          const rounded = Math.floor(elapsedTime / 1000);
          if (rounded !== lastSecond) {
            lastSecond = rounded;
            // console.log(lastSecond);
            CounterSound.start(audioCtx, undefined, r_frequency.current * 3);
          }
        }, 0);

        if (_length) {
          r_length.current = setTimeout(() => {
            clearInterval(r_timeout.current);
            setRunning(false);
            setTimer(_length * 1000);
            // CounterSound.stop();
            EndingSound.start(audioCtx, undefined, r_frequency.current * 1);
            EndingSound2.start(audioCtx, undefined, r_frequency.current * 1.5);
          }, _length * 1000);
        }
        StartSound.start(audioCtx, undefined, r_frequency.current * 2);
      }, _delay * 1000);
    },
    [running],
  );

  return (
    <Dialog>
      {(D) => (
        <main
          class={`speedup ${running ? "running" : ""} ${delay ? "delay" : ""}`}
        >
          <form
            action="javascript:void(0)"
            onSubmit={onFormSubmit}
          >
            <div className="timer">
              {formatTimer(timer)}
            </div>

            <section>
              <SettingItem name="length" />
            </section>
            <section>
              <SettingItem name="delay" />
            </section>
            <section>
              <button
                children={running ? "⏱ Stop" : "⏰ Start"}
              />
              <button
                type="reset"
                children="♻"
                onClick={() => {
                  setTimer(0);
                  setRunning(false);
                  setDelay(0);
                  LastContext?.close();
                  clearInterval(r_timeout.current);
                }}
              />
              <button
                type={"button"}
                onClick={D.openDialog}
                children="✺"
              />
            </section>
          </form>
          <D.Dialog ref={D.ref}>
            <main class="speedup-dialog">
              <form
                action="javascript:void(0)"
                onSubmit={(e) => {
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const _frequency = Number(formData.get("frequency"));
                  r_frequency.current = _frequency;
                  D.closeDialog();
                }}
                style={{ marginTop: "130px" }}
              >
                <section>
                  <pre>
                    Frequencies of notes in the C major scale
                    <br/>
                    Speed of Sound = 345 m/s = 1130 ft/s = 770 miles/hr
                    <br/>
                    const C = 261.63;
                    <br/>
                    const Cs = 277.18;
                    <br/>
                    const D = 293.66;
                    <br/>
                    const Ds = 311.13;
                    <br/>
                    const E = 329.63;
                    <br/>
                    const F = 349.23;
                    <br/>
                    const Fs = 369.99;
                    <br/>
                    const G = 392.00;
                    <br/>
                    const Gs = 415.30;
                    <br/>
                    const A = 440.00;
                    <br/>
                    const As = 466.16;
                    <br/>
                    const B = 493.88;
                    <br/>
                  </pre>
                </section>
                <SettingItem name="frequency" />
                <section>
                  <button children="Set" />
                  <button
                    type="reset"
                    children="♻"
                    onClick={() => {
                      r_frequency.current = Cs;
                    }}
                  />
                </section>
              </form>
            </main>
          </D.Dialog>
        </main>
      )}
    </Dialog>
  );
};
