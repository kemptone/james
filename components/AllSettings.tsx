import Dialog from "../components/Dialog.tsx";
import NumberGameActions from "./numberGame.actions.jsx";

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
                <NumberGameActions />
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
