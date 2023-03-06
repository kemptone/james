import { useEffect, useRef, useState } from "preact/hooks";
import useAudioLoop from "../hooks/useAudioLoop.tsx";
import type { AudioThing } from "../hooks/useAudioLoop.tsx";

const Test = () => {
  // const refSourceNode = useRef<AudioBufferSourceNode | null>();
  // const refAudioContext = useRef<AudioContext | undefined>();

  const Sound1: AudioThing = {
    audioFile: "/spin/fans/00.wav",
    initialPlaybackRate: 1,
    refSourceNode: useRef<AudioBufferSourceNode | null>(),
  };

  return (
    <div>
      <div style={{ height: "300px" }}></div>
      <button
        onClick={(e: Event) => {
          const context =
            new (window.AudioContext || window.webkitAudioContext)();

          // context.addEventListener("statechange", (e: Event) => {
          //   console.log("something");
          // });
          // source;
          //   context;
          //   debugger;
          // });

          // console.log(context.state);

          // This is fixing an issue that shows up on Safari
          if (context.state === "suspended") {
            context.resume();
          }

          useAudioLoop(Sound1, context, ({ source }) => {
            // const context = Sound1.refAudioContext.current;
            // const source = Sound1.refSourceNode.current;

            // context.addEventListener("statechange", (e) => {
            //   source;
            //   context;
            //   debugger;
            // });

            if (source && context) {
              const gainNode = context.createGain();
              gainNode.gain.value = 1;
              source.connect(gainNode);
              gainNode.connect(context.destination);
              source.start(0);
            }
          });
        }}
      >
        Start playing
      </button>
    </div>
  );
};

export default Test;
