import { TEXTURE_SIZE } from "../config/constants";
import type { Noise4D } from "./perlin";

export function generateTexture(
  noise: Noise4D,
  offset: [number, number, number, number],
  scale: number,
  baseColor: [number, number, number],
  noiseColor: [number, number, number],
): Uint8ClampedArray {
  const data = new Uint8ClampedArray(TEXTURE_SIZE * TEXTURE_SIZE * 4);
  const TAU = Math.PI * 2;

  for (let y = 0; y < TEXTURE_SIZE; y++) {
    const phi = (y / TEXTURE_SIZE) * TAU;
    const cz = Math.cos(phi) * scale + offset[2];
    const sz = Math.sin(phi) * scale + offset[3];

    for (let x = 0; x < TEXTURE_SIZE; x++) {
      const theta = (x / TEXTURE_SIZE) * TAU;
      const cx = Math.cos(theta) * scale + offset[0];
      const sx = Math.sin(theta) * scale + offset[1];

      const n = noise(cx, sx, cz, sz) * 0.5 + 0.5;

      const i = (y * TEXTURE_SIZE + x) * 4;

      data[i] = baseColor[0] + n * (noiseColor[0] - baseColor[0]);
      data[i + 1] = baseColor[1] + n * (noiseColor[1] - baseColor[1]);
      data[i + 2] = baseColor[2] + n * (noiseColor[2] - baseColor[2]);
      data[i + 3] = 255;
    }
  }

  return data;
}
