import { IS_BROWSER } from "https://deno.land/x/fresh@1.1.4/runtime.ts";
import {
  MutableRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "preact/hooks";

type SoundSettings = {
  frequency: number;
  length: number;
};

// frequency of middle c is 261.63
// frequency of C# 3 octaves higher is 261.63 * 2^3 = 2093.00
// frequency of C# 3 octaves lower is 261.63 / 2^3 = 32.70
// frequency of C# 2 octaves lower is 32.70 / 2^2 = 8.18
// const Cs = 32.70;
// const C = 261.63;

export default ({
  frequency = 261.63,
  length = 0.5,
}: SoundSettings) => {
  if (!IS_BROWSER) {
    return { start: () => {}, stop: () => {} };
  }

  function play(audioCtx: AudioContext) {
  }

  const start = useCallback((audioCtx: AudioContext) => {
    // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const gain = audioCtx.createGain();
    gain.connect(audioCtx.destination);

    const oscillator = audioCtx.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    // oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    oscillator.connect(gain);

    gain.gain.setValueCurveAtTime(
      [0, .25, .35, .3, .2, .35, .1, .2, .2, 0],
      audioCtx.currentTime,
      length,
    );
    // gain.gain.setValueAtTime(0, audioCtx.currentTime + 0.5);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + length);
  }, []);

  const stop = useCallback(() => {
    // oscillator.stop();
  }, []);

  return { start, stop };
};
