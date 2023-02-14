import Menu from "../islands/Menu.jsx";
import { useEffect, useRef, useState } from "preact/hooks";
// import { buildTimeleftHtml, max } from "../helpers/timer.js";

function constantRateReduction(rate, time, finalRate) {
  return -Math.log(finalRate / rate) / time;
}

const INTERVAL_SPEED = 3;
const baseRateOfRotation = 4;
const baseRateOfSlowdown = 1;
const baseThreshold = .03;

export default () => {
  const [resetTimeleft, setResetTimeleft] = useState(0);
  const [timeleft, setTimeleft] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [Sounds, setSounds] = useState(null);
  const [animationState, setAnimation] = useState("");
  const [rateOfSlowdown, setRateOfSlowdown] = useState(.005);

  let rotation = 0;
  let rateOfRotation = baseRateOfRotation;

  const intervals = {
    animation: null,
    animation2: null,
    interval: null,
  };

  function stopAll() {
    clearInterval(intervals.interval);
    clearInterval(intervals.animation);
    clearInterval(intervals.animation2);
    setTimeleft(1);
  }

  function countDown() {
    clearInterval(intervals.interval);
    clearInterval(intervals.animation);
    clearInterval(intervals.animation2);

    setAnimation("spin");

    rateOfRotation = baseRateOfRotation;
    rotation = 0;

    const bottom = Sounds?.bottom?.play();
    const middle = Sounds?.middle?.play();
    const e_image = document.querySelector("img#spinner");

    // Main rotation
    intervals.animation = setInterval((e) => {
      rotation += baseRateOfRotation;
      e_image.style.transform = `rotate(${rotation}deg)`;
    }, INTERVAL_SPEED);

    intervals.interval = setInterval((e) => {
      // setTimeleft((prev) => Math.max(0, prev - 1));
      setTimeleft((prev) => {
        if (prev === 1 || !prev) {
          setAnimation("");
          clearInterval(intervals.interval);
          clearInterval(intervals.animation);
          clearInterval(intervals.animation2);
          Sounds?.middle?.fade(1, 0, 2800, middle);
          Sounds?.bottom?.fade(1, 0, 4000, bottom);

          intervals.animation2 = setInterval((e) => {
            if (rateOfRotation < baseThreshold) {
              setTimeleft(resetTimeleft);
              return clearInterval(intervals.animation2);
            }
            rotation += rateOfRotation;
            e_image.style.transform = `rotate(${rotation}deg)`;
            rateOfRotation = rateOfRotation - rateOfSlowdown;

            console.log({
              rotation,
              rateOfRotation,
            });
          }, INTERVAL_SPEED);
        }

        return Math.max(0, prev - 1);
      });
    }, 1000);
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

    // _sounds.top?.on?.("end", (e) => {
    //   debugger;
    // });
  }, []);

  // useEffect(() => {
  //   let alarm = Number(hours) * 3600;
  //   alarm += Number(minutes) * 60;
  //   alarm += Number(seconds);
  //   setTimeleft(alarm);
  // }, [hours, minutes, seconds, rateOfSlowdown]);

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
              <span>Slow Down Time:&nbsp;&nbsp;</span>
              <input
                type="number"
                onChange={(e) => {
                  const value = Number(e?.currentTarget?.value ?? 2) ?? 2;
                  setRateOfSlowdown(
                    constantRateReduction(
                      baseRateOfRotation,
                      value * (1000 / INTERVAL_SPEED),
                      .02,
                    ),
                  );

                  rateOfRotation = baseRateOfRotation;
                }}
              />
            </div>
            <div>
              <span>Motor Time:&nbsp;&nbsp;</span>
              <input
                type="number"
                onChange={(e) => {
                  const value = Number(e?.currentTarget?.value ?? 0) ?? 0;
                  setResetTimeleft(value);
                  setTimeleft(value);
                }}
              />
            </div>

            <div>
              {/* <span children={buildTimeleftHtml(timeleft)} /> */}
            </div>
            <button
              onClick={animationState
                ? ((e) => {
                  clearInterval(intervals.interval);
                  clearInterval(intervals.animation);
                  clearInterval(intervals.animation2);
                  setAnimation("");
                  rateOfRotation = baseRateOfRotation;
                })
                : countDown}
              children={animationState === "spin" ? "Stop" : `Start`}
            />
          </div>
          {
            /* <div>
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
          </div> */
          }
        </footer>
      </main>
    </>
  );
};
