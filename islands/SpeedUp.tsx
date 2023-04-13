import { useCallback, useEffect, useRef, useState } from "preact/hooks";
import Dialog from "../components/Dialog.tsx";
import { JSX } from "preact/jsx-runtime";

const SettingItem = ({ name, type = "number" }: {
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
  const r_timeout = useRef<number>();

  // formats a number as a timer string, with hours, minutes, and seconds

  const onFormSubmit = useCallback(
    (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const delay = Number(formData.get("delay"));

      clearInterval(r_timeout.current);

      if (running) {
        setRunning(false);
        return;
      }

      // form.querySelectorAll("input").forEach((i) => {
      //   i.value = "";
      // });

      setRunning(true);

      setTimeout(() => {
        const startTime = Date.now();
        r_timeout.current = setInterval(function () {
          const elapsedTime = Date.now() - startTime;
          setTimer(elapsedTime);
        }, 0);
      }, delay * 1000);
    },
    [running],
  );

  return (
    <main class={"speedup"}>
      <form
        action="javascript:void(0)"
        onSubmit={onFormSubmit}
      >
        <div className="timer">
          {formatTimer(timer)}
        </div>

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
              clearInterval(r_timeout.current);
            }}
          />
        </section>
      </form>
      {
        /* <Dialog>
        {(D) => (
          <>
            <button onClick={D.openDialog}>☕</button>
            <D.Dialog ref={D.ref}>
              <ol>
                <li>
                  <a href="https://pacificaview.net/livecam/sharp_triptych.php">
                    Beach Cam
                  </a>
                </li>
              </ol>
            </D.Dialog>
          </>
        )}
      </Dialog> */
      }
    </main>
  );
};
