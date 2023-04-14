import { useCallback, useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import useAudioSoundLoop from "../hooks/useAudioSoundLoop.tsx";

// frequency of middle c is 261.63
// frequency of C# 3 octaves higher is 261.63 * 2^3 = 2093.00
// frequency of C# 3 octaves lower is 261.63 / 2^3 = 32.70
// frequency of C# 2 octaves lower is 32.70 / 2^2 = 8.18
const Cs = 32.70;
const C = 261.63;

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
  const r_timeout = useRef<number>();
  const CounterSound = useAudioSoundLoop({
    frequency: Cs * 3,
    length: 0.5,
  });

  const StartSound = useAudioSoundLoop({
    frequency: C * 3,
    length: 1,
  });

  // formats a number as a timer string, with hours, minutes, and seconds

  const onFormSubmit = useCallback(
    (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
      e.preventDefault();

      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const _delay = Number(formData.get("delay"));
      const _length = Number(formData.get("length"));

      setDelay(_delay);

      clearInterval(r_timeout.current);

      if (running) {
        setRunning(false);
        return;
      }

      setRunning(true);

      setTimeout(() => {
        const startTime = Date.now();
        let lastSecond = 0;
        r_timeout.current = setInterval(function () {
          const elapsedTime = Date.now() - startTime;
          setTimer(elapsedTime);
          const rounded = Math.floor(elapsedTime / 1000);
          if (rounded !== lastSecond) {
            lastSecond = rounded;
            // console.log(lastSecond);
            CounterSound.start(audioCtx);
          }
        }, 0);

        if (_length) {
          setTimeout(() => {
            clearInterval(r_timeout.current);
            setRunning(false);
            setTimer(_length * 1000);
            // CounterSound.stop();
          }, _length * 1000);
        }
        StartSound.start(audioCtx);
      }, _delay * 1000);
    },
    [running],
  );

  return (
    <main class={`speedup ${running ? "running" : ""} ${delay ? "delay" : ""}`}>
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
              clearInterval(r_timeout.current);
            }}
          />
        </section>
      </form>
    </main>
  );
};
