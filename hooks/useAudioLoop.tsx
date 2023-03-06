import { MutableRef, useEffect, useRef, useState } from "preact/hooks";

export type AudioThing = {
  audioFile: string;
  initialPlaybackRate: number;
  refSourceNode: MutableRef<AudioBufferSourceNode | null | undefined>;
  refAudioContext: MutableRef<AudioContext | undefined>;
};

function useAudioLoop(
  audio: AudioThing,
  callback: (a: AudioThing) => void,
) {
  const {
    refSourceNode,
    refAudioContext,
    audioFile,
    initialPlaybackRate,
  } = audio;

  const audioContext = refAudioContext.current ??
    (refAudioContext.current = new AudioContext());

  fetch(audioFile)
    .then((response) => response.arrayBuffer())
    .then((buffer) => audioContext.decodeAudioData(buffer))
    .then((audioBuffer) => {
      const {
        sampleRate,
        numberOfChannels,
        length,
      } = audioBuffer;

      // we build our samples perfect like this
      const loopLength = Math.floor(length / 8);
      // should be in the middle
      const loopStart = loopLength * 2;

      const loopBuffer = audioContext.createBuffer(
        numberOfChannels,
        loopLength,
        sampleRate,
      );

      for (let channel = 0; channel < numberOfChannels; channel++) {
        const channelData = audioBuffer.getChannelData(channel);
        const loopData = loopBuffer.getChannelData(channel);
        for (let i = 0; i < loopLength; i++) {
          loopData[i] = channelData[Math.floor(loopStart) + i];
        }
      }

      const source = refSourceNode.current = audioContext
        .createBufferSource();
      source.buffer = loopBuffer;
      source.loop = true;
      source.playbackRate.setValueAtTime(
        initialPlaybackRate,
        audioContext.currentTime,
      );

      const rampUpDuration = 0.5;
      const rampDownDuration = 0.5;
      const rampUpStartTime = audioContext.currentTime;
      const rampDownStartTime = audioContext.currentTime +
        loopBuffer.duration - rampDownDuration;

      source.playbackRate.setValueAtTime(
        initialPlaybackRate,
        rampUpStartTime,
      );
      source.playbackRate.linearRampToValueAtTime(
        initialPlaybackRate * 2,
        rampUpStartTime + rampUpDuration,
      );
      source.playbackRate.linearRampToValueAtTime(
        initialPlaybackRate * 2,
        rampDownStartTime,
      );
      source.playbackRate.linearRampToValueAtTime(
        initialPlaybackRate,
        rampDownStartTime + rampDownDuration,
      );

      callback(audio);
    });
}

export default useAudioLoop;
