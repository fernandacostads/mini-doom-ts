export type Noise4D = (x: number, y: number, z: number, w: number) => number;

export function createPerlin4D(): Noise4D {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;

  for (let i = 255; i > 0; i--) {
    const j = Math.floor((i + 1) * Math.random());
    [p[i], p[j]] = [p[j], p[i]];
  }

  const perm = new Uint8Array(512);
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

  function fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(a: number, b: number, t: number) {
    return a + t * (b - a);
  }

  function grad4(h: number, x: number, y: number, z: number, w: number) {
    h &= 31;
    const u = h < 24 ? x : y;
    const v = h < 16 ? y : z;
    const q = h < 8 ? z : w;
    return (h & 1 ? -u : u) + (h & 2 ? -v : v) + (h & 4 ? -q : q);
  }

  return function noise4(x, y, z, w) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    const W = Math.floor(w) & 255;

    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    w -= Math.floor(w);

    const fx = fade(x);
    const fy = fade(y);
    const fz = fade(z);
    const fw = fade(w);

    const A = perm[X] + Y;
    const B = perm[X + 1] + Y;

    const AA = perm[A] + Z;
    const AB = perm[A + 1] + Z;
    const BA = perm[B] + Z;
    const BB = perm[B + 1] + Z;

    const AAA = perm[AA] + W;
    const AAB = perm[AA + 1] + W;
    const ABA = perm[AB] + W;
    const ABB = perm[AB + 1] + W;
    const BAA = perm[BA] + W;
    const BAB = perm[BA + 1] + W;
    const BBA = perm[BB] + W;
    const BBB = perm[BB + 1] + W;

    return lerp(
      lerp(
        lerp(
          lerp(
            grad4(perm[AAA], x, y, z, w),
            grad4(perm[BAA], x - 1, y, z, w),
            fx,
          ),
          lerp(
            grad4(perm[ABA], x, y - 1, z, w),
            grad4(perm[BBA], x - 1, y - 1, z, w),
            fx,
          ),
          fy,
        ),
        lerp(
          lerp(
            grad4(perm[AAB], x, y, z - 1, w),
            grad4(perm[BAB], x - 1, y, z - 1, w),
            fx,
          ),
          lerp(
            grad4(perm[ABB], x, y - 1, z - 1, w),
            grad4(perm[BBB], x - 1, y - 1, z - 1, w),
            fx,
          ),
          fy,
        ),
        fz,
      ),
      lerp(
        lerp(
          lerp(
            grad4(perm[AAA + 1], x, y, z, w - 1),
            grad4(perm[BAA + 1], x - 1, y, z, w - 1),
            fx,
          ),
          lerp(
            grad4(perm[ABA + 1], x, y - 1, z, w - 1),
            grad4(perm[BBA + 1], x - 1, y - 1, z, w - 1),
            fx,
          ),
          fy,
        ),
        lerp(
          lerp(
            grad4(perm[AAB + 1], x, y, z - 1, w - 1),
            grad4(perm[BAB + 1], x - 1, y, z - 1, w - 1),
            fx,
          ),
          lerp(
            grad4(perm[ABB + 1], x, y, z - 1, w - 1),
            grad4(perm[BBB + 1], x - 1, y - 1, z - 1, w - 1),
            fx,
          ),
          fy,
        ),
        fz,
      ),
      fw,
    );
  };
}
