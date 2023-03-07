import { useEffect, useRef, useState } from "preact/hooks";
import useAudioLoop from "../hooks/useAudioLoop.tsx";
import type { AudioThing } from "../hooks/useAudioLoop.tsx";
import useReverb from "../hooks/useReverb.tsx";

const Test = () => {
  // const refSourceNode = useRef<AudioBufferSourceNode | null>();
  const refAudioContext = useRef<AudioContext | undefined>();

  const Sound1: AudioThing = {
    audioFile: "/spin/fans/00.wav",
    initialPlaybackRate: 1,
    refSourceNode: useRef<AudioBufferSourceNode | null>(),
    refPlaying: useRef<boolean>(false),
    refPlay: useRef(() => undefined),
    refStop: useRef(() => undefined),
    refLoaded: useRef(false),
  };

  return (
    <div>
      <div style={{ height: "300px" }}></div>
      <button
        onClick={(e: Event) => {
          const target = e.target as HTMLButtonElement;

          let context = refAudioContext.current;

          if (!context) {
            context =
              refAudioContext.current =
                new (window.AudioContext || window.webkitAudioContext)();
          }

          if (Sound1.refPlaying.current) {
            Sound1.refStop.current();
            target.innerText = "Start Playing";
            return;
          }

          // This is fixing an issue that shows up on Safari
          if (context.state === "suspended") {
            context.resume();
          }

          useReverb("/impulse/reaperblog/IRx125_03A.wav", context).then(
            (reverb) => {
              if (!context) {
                return;
              }

              useAudioLoop(Sound1, context, ({ source }) => {
                const SPEED = 3;

                if (source && context) {
                  const rampUp = 3;
                  const run = 10;
                  const slow = 15;

                  source.playbackRate.setValueCurveAtTime(
                    [0, .1, .3, .6, 1].map((i) => i * SPEED),
                    context.currentTime,
                    rampUp,
                  );

                  source.playbackRate.setTargetAtTime(
                    1 * SPEED,
                    context.currentTime + rampUp,
                    run,
                  );

                  source.playbackRate.setValueCurveAtTime(
                    [1, .9, .8, .7, .5, .3, .1, 0].map((i) => i * SPEED),
                    context.currentTime + rampUp + run,
                    slow,
                  );

                  source.connect(reverb);
                  reverb.connect(context.destination);

                  // source.connect(context.destination);

                  Sound1.refPlay.current();
                  target.innerText = "Stop Playing";
                }
              });
            },
          );
        }}
      >
        Start playing
      </button>
    </div>
  );
};

export default Test;
