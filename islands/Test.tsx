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
    refAudioContext: useRef<AudioContext | undefined>(),
  };

  return (
    <div>
      <div style={{ height: "300px" }}></div>
      <button
        onClick={(e: Event) => {
          // refAudioContext;
          // refSourceNode;

          useAudioLoop(Sound1, () => {
            if (
              Sound1.refSourceNode.current && Sound1.refAudioContext.current
            ) {
              Sound1.refSourceNode.current.connect(
                Sound1.refAudioContext.current.destination,
              );

              Sound1.refSourceNode.current.start(0);
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
