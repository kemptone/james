import { useEffect, useState } from "preact/hooks";

export function useAudioLoop(
  audioFile: string,
  initialVolume = 0.5,
  initialPlaybackRate = 1,
) {
  const [sourceNode, setSourceNode] = useState(null);

  useEffect(() => {
    const audioContext = new AudioContext();

    fetch(audioFile)
      .then((response) => response.arrayBuffer())
      .then((buffer) => audioContext.decodeAudioData(buffer))
      .then((audioBuffer) => {
        const {
          sampleRate,
          numberOfChannels,
          length,
        } = audioBuffer;

        // const sampleRate = audioBuffer.sampleRate;
        // const numChannels = audioBuffer.numberOfChannels;
        // const loopLength = Math.floor((loopEnd - loopStart) * sampleRate);

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

        const source = audioContext.createBufferSource();
        source.buffer = loopBuffer;
        source.loop = true;
        source.playbackRate.setValueAtTime(
          initialPlaybackRate,
          audioContext.currentTime,
        );

        const gain = audioContext.createGain();
        gain.gain.value = .5;
        // gain.gain.setValueAtTime(0, audioContext.currentTime);
        // gain.gain.linearRampToValueAtTime(
        //   initialVolume,
        //   audioContext.currentTime + 0.5,
        // );
        // gain.gain.linearRampToValueAtTime(
        //   initialVolume,
        //   audioContext.currentTime + 1 - 0.5,
        // );
        // gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 1);

        source.connect(gain);
        gain.connect(audioContext.destination);
        // source.start();

        const rampUpDuration = 0.5;
        const rampDownDuration = 0.5;
        const rampUpStartTime = audioContext.currentTime;
        const rampDownStartTime = audioContext.currentTime +
          loopBuffer.duration - rampDownDuration;

        // source.playbackRate.setValueAtTime(
        //   initialPlaybackRate,
        //   rampUpStartTime,
        // );
        // source.playbackRate.linearRampToValueAtTime(
        //   initialPlaybackRate * 2,
        //   rampUpStartTime + rampUpDuration,
        // );
        // source.playbackRate.linearRampToValueAtTime(
        //   initialPlaybackRate * 2,
        //   rampDownStartTime,
        // );
        // source.playbackRate.linearRampToValueAtTime(
        //   initialPlaybackRate,
        //   rampDownStartTime + rampDownDuration,
        // );

        setSourceNode(source);
      });

    return () => {
      audioContext.close();
    };
  }, [audioFile, initialVolume, initialPlaybackRate]);

  return sourceNode;
}
