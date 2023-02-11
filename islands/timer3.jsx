import Menu from "../islands/Menu.jsx";
import { useEffect, useRef, useState } from "preact/hooks";
import { buildTimeleftHtml, max } from "../helpers/timer.js";

export default () => {
  const [maxTime, setMaxtime] = useState(0);
  const [timeleft, setTimeleft] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [Sounds, setSounds] = useState(null);
  const [animationState, setAnimation] = useState("");
  const [offtimer, setOffTimer] = useState(2);
  const [spintimer, setSpinTimer] = useState(.5);
  // const [startTime, setStartTime] = useState(new Date());
  const animatedImage = useRef(null);

  let rotation = 0;
  let baseRateOfRotation = 4;
  let rateOfRotation = 4;
  const baseRateOfSlowdown = 1;
  let rateOfSlowdown = .9987;
  let threshold = .03;
  let animation2;

  function stopAll() {
    setTimeleft(1);
  }

  function countDown() {
    if (animationState) {
      return stopAll();
    }

    clearInterval(animation2);

    const bottom = Sounds?.bottom?.play();
    const middle = Sounds?.middle?.play();
    const e_image = document.querySelector("img#spinner");

    const animation = setInterval((e) => {
      rotation += rateOfRotation;
      e_image.style.transform = `rotate(${rotation}deg)`;
    }, 0);

    const interval = setInterval((e) => {
      setTimeleft((prev) => {
        if (prev === 1 || !prev) {
          setAnimation("");
          clearInterval(interval);
          clearInterval(animation);
          Sounds?.middle?.fade(1, 0, 2800, middle);
          Sounds?.bottom?.fade(1, 0, 4000, bottom);

          animation2 = setInterval((e) => {
            if (rateOfRotation < threshold) {
              return clearInterval(animation2);
            }
            console.count("animation2");
            rateOfRotation *= rateOfSlowdown;
            rotation += rateOfRotation;
            e_image.style.transform = `rotate(${rotation}deg)`;
          }, 0);
        }
        return Math.max(0, prev - 1);
      });
    }, 1000);

    setAnimation("spin");
  }

  useEffect(() => {
    const _sounds = {
      top: new Howl({
        src: ["/timer/Sounds/middle.mp3"],
        rate: 1,
        loop: true,
      }),
      middle: new Howl({
        src: ["/timer/Sounds/middle.mp3"],
        rate: .2,
        loop: true,
      }),
      bottom: new Howl({
        src: ["/timer/Sounds/middle.mp3"],
        rate: .3,
      }),
    };

    setSounds(_sounds);

    _sounds.top?.on?.("end", (e) => {
      debugger;
    });
  }, []);

  useEffect(() => {
    let alarm = Number(hours) * 3600;
    alarm += Number(minutes) * 60;
    alarm += Number(seconds);
    setTimeleft(alarm);
    setMaxtime(alarm);
  }, [hours, minutes, seconds]);

  return (
    <>
      <main id="jamestimer" className={animationState}>
        <header>
          <div class="controls">
            <img id="spinner" src="/timer/spinners/25428-200.png" />
            <div>
            </div>
          </div>
        </header>
        <footer>
          <div className="new-timer-section">
            <div>
              <span>Go Off:&nbsp;&nbsp;</span>
              <input
                type="range"
                name="rate"
                min="1"
                max="200"
                onChange={(e) => {
                  const value = Number(e.currentTarget.value);
                  clearInterval(animation2);
                  rateOfSlowdown = baseRateOfSlowdown - (value * .0001);
                  rateOfRotation = baseRateOfRotation;
                  console.log({ rateOfSlowdown });
                }}
              />
              {
                /* <input
                type="number"
                name="tilloff"
                onChange={(e) => {
                  const value = e?.currentTarget?.value ?? 2;
                  setOffTimer(value);
                  // document?.body?.setProperty?.("--slow-down", value);
                }}
              /> */
              }
            </div>
            <div>
              <span>Slow Down:&nbsp;&nbsp;</span>
              <span children={buildTimeleftHtml(timeleft)} />
            </div>
            <button
              onClick={countDown}
              children={animationState ? "Stop" : `Start`}
            />
          </div>
          <div>
            <select
              onChange={(e) => {
                setHours(e.target.value);
              }}
            >
              {max.hours.map((value) => (
                <option
                  children={value + (value === 1 ? " hour" : " hours")}
                  value={value}
                />
              ))}
            </select>
            <select
              onChange={(e) => {
                setMinutes(e.target.value);
              }}
            >
              {max.minutes.map((value) => (
                <option
                  children={value + (value === 1 ? " minute" : " minutes")}
                  value={value}
                />
              ))}
            </select>
            <select
              onChange={(e) => {
                setSeconds(e.target.value);
              }}
            >
              {max.seconds.map((value) => (
                <option
                  children={value + (value === 1 ? " second" : " seconds")}
                  value={value}
                />
              ))}
            </select>
          </div>
        </footer>
      </main>
    </>
  );
};
