import { MutableRef } from "preact/hooks";
import { h } from "preact";
export type SoundItem = {
  buffer: AudioBuffer;
  x: number;
  y: number;
  color: string;
  name: string;
};
