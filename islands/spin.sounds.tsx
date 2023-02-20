function SpinSounds(
  audioContext: AudioContext,
  totalTime: number,
  totalRotations: number,
) {
  // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const context = audioContext;

  let sound1: AudioBufferSourceNode | null = null;
  let sound2: AudioBufferSourceNode | null = null;

  // load the sound files
  loadSound(
    "/spin/swoop_206.mp3",
    function (buffer: AudioBuffer) {
      sound1 = createBufferSource(buffer, false);
    },
  );
  loadSound(
    "/spin/main_206.mp3",
    function (buffer: AudioBuffer) {
      sound2 = createBufferSource(buffer, true);
    },
  );

  // connect the buffer source nodes in parallel
  function createBufferSource(
    buffer: AudioBuffer,
    slower: boolean,
  ) {
    const {
      sampleRate,
      numberOfChannels,
      length,
      duration,
    } = buffer;

    // we build our samples perfect like this
    const loopLength = Math.floor(length / 8);
    // should be in the middle
    const loopStart = loopLength * 2;

    // Create a new AudioBuffer to hold the looped section
    const loopBuffer = audioContext.createBuffer(
      numberOfChannels,
      loopLength,
      sampleRate,
    );

    // Copy the looped section from the original audio buffer to the new buffer
    for (let channel = 0; channel < numberOfChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      const loopData = loopBuffer.getChannelData(channel);
      for (let i = 0; i < loopLength; i++) {
        loopData[i] = channelData[Math.floor(loopStart) + i];
      }
    }

    const source = audioContext.createBufferSource();
    // source.buffer = buffer;
    source.buffer = loopBuffer;
    source.loop = true;

    // Create a gain node to control the volume of the looped section
    const gainNode = context.createGain();

    if (slower) {
      gainNode.gain.value = 0.4; // set the initial volume to 50%
    } else {
      gainNode.gain.value = 0.7; // set the initial volume to 50%
    }

    // Reverb
    const convolver = context.createConvolver();
    const reverbTime = 1.1; // the duration of the reverb effect, in seconds
    const reverbBufferLength = Math.ceil(reverbTime * context.sampleRate);
    const reverbBuffer = context.createBuffer(
      2,
      reverbBufferLength,
      context.sampleRate,
    );
    const leftChannel = reverbBuffer.getChannelData(0);
    const rightChannel = reverbBuffer.getChannelData(1);
    // Create an impulse response that simulates a small room
    for (let i = 0; i < reverbBufferLength; i++) {
      leftChannel[i] = (Math.random() * 2 - 1) *
        Math.pow(1 - i / reverbBufferLength, 2);
      rightChannel[i] = (Math.random() * 2 - 1) *
        Math.pow(1 - i / reverbBufferLength, 2);
    }
    convolver.buffer = reverbBuffer;

    source.connect(convolver);
    convolver.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // const totalTime = 90;
    // const totalRotations = 80;

    // playback rate
    // const RATE = Math.max(Math.min((totalRotations / totalTime) * 4, 200), .05);
    const RATE = slower
      ? Math.max(Math.min((totalRotations / totalTime) * 1, 10), .05)
      : (totalRotations / totalTime);
    // const RATE = Math.max(
    //   Math.min((totalRotations / totalTime) * 1.3, 10),
    //   .5,
    // );

    if (slower) {
      source.playbackRate.setValueAtTime(0.0, context.currentTime);
      source.playbackRate.linearRampToValueAtTime(RATE, totalTime / 8);
      source.playbackRate.setValueAtTime(
        RATE,
        context.currentTime + ((totalTime / 2) - totalTime / 3),
      );
      source.playbackRate.linearRampToValueAtTime(
        0,
        context.currentTime + ((totalTime / 2) - totalTime / 4) +
          (totalTime / 8),
      );
    } else {
      source.playbackRate.setValueAtTime(0.0, context.currentTime);
      source.playbackRate.linearRampToValueAtTime(RATE, totalTime / 4);
      source.playbackRate.setValueAtTime(
        RATE,
        // context.currentTime + (totalTime / 2) - totalTime / 8,
        context.currentTime + ((totalTime / 2) - totalTime / 8),
      );
      source.playbackRate.linearRampToValueAtTime(
        0,
        totalTime,
      );
    }

    // source.playbackRate.setValueAtTime(0.0, context.currentTime);
    // source.playbackRate.linearRampToValueAtTime(RATE, totalTime / 8);
    // source.playbackRate.setValueAtTime(
    //   RATE,
    //   context.currentTime + ((totalTime / 2) - totalTime / 3),
    // );
    // source.playbackRate.linearRampToValueAtTime(
    //   0,
    //   context.currentTime + ((totalTime / 2) - totalTime / 4) +
    //     (totalTime / 8),
    // );

    // source.connect(audioContext.destination);
    return source;
  }

  function loadSound(
    url: string,
    callback: (buffer: AudioBuffer) => void,
  ) {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
    request.onload = function () {
      audioContext.decodeAudioData(request.response, function (buffer) {
        callback(buffer);
      });
    };
    request.send();
  }

  // play the sounds at the same time
  function playSounds() {
    if (sound1 && sound2) {
      sound1.start(0);
      sound2.start(0);
    }
  }

  function stopSounds() {
    if (sound1 && sound2) {
      sound1.stop();
      sound2.stop();
    }
  }

  return { playSounds, stopSounds };
}

export default SpinSounds;