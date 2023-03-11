import { useEffect, useRef, useState } from "preact/hooks";
import useAudioLoop from "../hooks/useAudioLoop.tsx";
import type { AudioThing } from "../hooks/useAudioLoop.tsx";
import { buildReverb, loadReverb } from "../hooks/useReverb.tsx";
// import Tunajs from "tunajs";

const Test = () => {
  // const refSourceNode = useRef<AudioBufferSourceNode | null>();
  const refAudioContext = useRef<AudioContext | undefined>();

  // const Sound1: AudioThing = {
  //   audioFile: "/spin/fans/00.wav",
  //   initialPlaybackRate: 1,
  //   refSourceNode: useRef<AudioBufferSourceNode | null>(),
  //   refPlaying: useRef<boolean>(false),
  //   refPlay: useRef(() => undefined),
  //   refStop: useRef(() => undefined),
  //   refLoaded: useRef(false),
  // };

  const Sounds: AudioThing[] = [
    {
      audioFile: "/spin/fans/00.wav",
      initialPlaybackRate: .501,
      refSourceNode: useRef<AudioBufferSourceNode | null>(),
      refPlaying: useRef(false),
      refPlay: useRef(() => undefined),
      refStop: useRef(() => undefined),
      refLoaded: useRef(false),
    },
    {
      audioFile: "/spin/fans/01.wav",
      initialPlaybackRate: 1.2501,
      refSourceNode: useRef<AudioBufferSourceNode | null>(),
      refPlaying: useRef(false),
      refPlay: useRef(() => undefined),
      refStop: useRef(() => undefined),
      refLoaded: useRef(false),
    },
    {
      audioFile: "/spin/fans/08.wav",
      initialPlaybackRate: .25,
      refSourceNode: useRef<AudioBufferSourceNode | null>(),
      refPlaying: useRef(false),
      refPlay: useRef(() => undefined),
      refStop: useRef(() => undefined),
      refLoaded: useRef(false),
    },
  ];

  return (
    <div>
      <div style={{ height: "300px" }}></div>
      <button
        onClick={(e) => {
          const target = e.target as HTMLButtonElement;

          let context = refAudioContext.current;

          if (!context) {
            context =
              refAudioContext.current =
                new (window.AudioContext || window.webkitAudioContext)();
          }

          if (Sounds[0].refPlaying.current) {
            Sounds.forEach((s) => {
              s.refStop.current();
            });
            target.innerText = "Start Playing";
            return;
          }

          // This is fixing an issue that shows up on Safari
          if (context.state === "suspended") {
            context.resume();
          }

          loadReverb("/impulse/reaperblog/IRx500_03C.wav", context).then(
            (reverb) => {
              if (!context) {
                context =
                  refAudioContext.current =
                    new (window.AudioContext || window.webkitAudioContext)();
              }

              const gain = new GainNode(context);
              gain.gain.value = .125;

              // const tunajs = Tunajs(context);

              // const chorus = new tunajs.Chorus({
              //   rate: 1.5,
              //   feedback: 0.4,
              //   delay: 0.0045,
              //   bypass: false,
              // });

              // chorus.connect(context.destination);

              reverb.connect(context.destination);
              // reverb.connect(chorus);

              gain.connect(reverb);

              Sounds.forEach((s) => {
                if (!context) {
                  return;
                }

                useAudioLoop(s, context, ({ source }) => {
                  const SPEED = 4;

                  if (source && context) {
                    const rampUp = 3;
                    const run = 4;
                    const slow = 5;

                    source.playbackRate.setValueCurveAtTime(
                      [0, .1, .3, .6, 1].map((i) => i * s.initialPlaybackRate),
                      context.currentTime,
                      rampUp,
                    );

                    source.playbackRate.setTargetAtTime(
                      1 * s.initialPlaybackRate,
                      context.currentTime + rampUp,
                      run,
                    );

                    source.playbackRate.setValueCurveAtTime(
                      [1, .9, .8, .7, .5, .3, .1, 0].map((i) =>
                        i * s.initialPlaybackRate
                      ),
                      context.currentTime + rampUp + run,
                      slow,
                    );

                    source.addEventListener("ended", (listener) => {
                      debugger;
                    });

                    // source.detune.setValueCurveAtTime(
                    //   [1, .9, .8, .7, .5, .3, .1, 0].map((i) => i * 1000),
                    //   context.currentTime,
                    //   slow + rampUp + run,
                    // );

                    source.connect(gain);

                    // source.connect(context.destination);

                    s.refPlay.current();

                    source.stop(
                      context.currentTime + rampUp + run + slow + 2,
                    );

                    target.innerText = "Stop Playing";
                  }
                });
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
