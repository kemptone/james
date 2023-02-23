import { Button } from "./Button.tsx";
import {
  CurrentMathProblem,
  Number1MultiplyBy,
  Number2MultiplyBy,
  Step,
} from "../data/State.ts";
import Dialog from "../components/Dialog.tsx";

import _LS from "../helpers/localStorage.js";
const LS = _LS("Game");

export default () => {
  const factorPlus = (val, Num) => () => {
    Num.value += val;
    // Step.value++
  };

  const makeHarderBy = (by, Num) => () => {
    Num.value *= by;
    // Step.value++
  };

  return (
    <Dialog>
      {(D) => (
        <>
          <a onClick={D.openDialog}>settings</a>

          <D.Dialog ref={D.ref}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <dfl>
                <dt>
                  SIZE A [ <code children={Number1MultiplyBy.value} /> ]
                </dt>
                <dd>
                  <button onClick={makeHarderBy(.1, Number1MultiplyBy)}>
                    ÷ 10
                  </button>
                  <button onClick={makeHarderBy(10, Number1MultiplyBy)}>
                    × 10
                  </button>
                  <button onClick={factorPlus(-1, Number1MultiplyBy)}>
                    - 1
                  </button>
                  <button onClick={factorPlus(1, Number1MultiplyBy)}>
                    + 1
                  </button>
                </dd>
                <dt>
                  SIZE B [ <code children={Number2MultiplyBy.value} /> ]
                </dt>
                <dd>
                  <button onClick={makeHarderBy(.1, Number2MultiplyBy)}>
                    ÷ 10
                  </button>
                  <button onClick={makeHarderBy(10, Number2MultiplyBy)}>
                    × 10
                  </button>
                  <button onClick={factorPlus(-1, Number2MultiplyBy)}>
                    - 1
                  </button>
                  <button onClick={factorPlus(1, Number2MultiplyBy)}>
                    + 1
                  </button>
                </dd>
                <dt>STEP</dt>
                <dd>
                  <button onClick={(e) => Step.value++}>+ 1</button>
                </dd>
                <dt></dt>
                <dd>
                  <button
                    id="reset-button"
                    onClick={(e) => {
                      localStorage.clear();
                      LS.populate("Number1MultiplyBy", 1);
                      LS.populate("Number2MultiplyBy", 10);
                      LS.populate("Number1IsRandom", true);
                      LS.populate("IsNum2DerivedFromNum1", true);
                      LS.populate("Step", 0);
                      caches.delete("my-cache");

                      setTimeout(() => {
                        location.reload();
                      }, 1000);

                      navigator.serviceWorker.getRegistration()
                        .then(
                          (registration) => {
                            registration?.unregister().then(() => {
                              console.log("Service worker unregistered");
                              location.reload();
                            });
                          },
                        );
                    }}
                  >
                    Reinstall App
                  </button>
                </dd>
              </dfl>
            </form>
          </D.Dialog>
        </>
      )}
    </Dialog>
  );
};
