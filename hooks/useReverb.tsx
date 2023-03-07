export async function createReverb(
  audioFile: string,
  context: AudioContext,
) {
  const convolver = context.createConvolver();

  // load impulse response from file
  const response = await fetch(audioFile);
  const arraybuffer = await response.arrayBuffer();
  convolver.buffer = await context.decodeAudioData(arraybuffer);

  return convolver;
}

export default createReverb;
