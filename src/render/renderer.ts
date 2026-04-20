import type { Player } from "../game/player";
import { MAP, TEXTURE_SIZE } from "../config/constants";

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private canvas: HTMLCanvasElement;
  private wallTex: Uint8ClampedArray;
  private floorTex: Uint8ClampedArray;
  private ceilTex: Uint8ClampedArray;
  private gunImage: HTMLImageElement;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    wallTex: Uint8ClampedArray,
    floorTex: Uint8ClampedArray,
    ceilTex: Uint8ClampedArray,
    gunImage: HTMLImageElement,
  ) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.wallTex = wallTex;
    this.floorTex = floorTex;
    this.ceilTex = ceilTex;
    this.gunImage = gunImage;
  }

  render(player: Player) {
    const w = this.canvas.width;
    const h = this.canvas.height;

    const frame = this.ctx.createImageData(w, h);
    const buf = frame.data;

    const setPixel = (
      x: number,
      y: number,
      r: number,
      g: number,
      b: number,
    ) => {
      const i = (y * w + x) * 4;
      buf[i] = r;
      buf[i + 1] = g;
      buf[i + 2] = b;
      buf[i + 3] = 255;
    };

    // FLOOR + CEILING
    for (let y = 0; y < h; y++) {
      const isFloor = y > h / 2;
      const rowDir = isFloor ? y - h / 2 : h / 2 - y;
      if (rowDir === 0) continue;

      const rowDist = h / 2 / rowDir;

      const stepX = (rowDist * 2 * player.planeX) / w;
      const stepY = (rowDist * 2 * player.planeY) / w;

      let floorX = player.x + rowDist * (player.dirX - player.planeX);
      let floorY = player.y + rowDist * (player.dirY - player.planeY);

      for (let x = 0; x < w; x++) {
        const tx =
          ((Math.floor(floorX * TEXTURE_SIZE) % TEXTURE_SIZE) + TEXTURE_SIZE) %
          TEXTURE_SIZE;

        const ty =
          ((Math.floor(floorY * TEXTURE_SIZE) % TEXTURE_SIZE) + TEXTURE_SIZE) %
          TEXTURE_SIZE;

        const ti = (ty * TEXTURE_SIZE + tx) * 4;
        const tex = isFloor ? this.floorTex : this.ceilTex;

        const light = Math.max(0.15, 1 - rowDist * 0.07);

        if (ti >= 0 && ti < tex.length) {
          setPixel(
            x,
            y,
            tex[ti] * light,
            tex[ti + 1] * light,
            tex[ti + 2] * light,
          );
        }

        floorX += stepX;
        floorY += stepY;
      }
    }

    // WALLS
    for (let x = 0; x < w; x++) {
      const cameraX = (2 * x) / w - 1;

      const rayDirX = player.dirX + player.planeX * cameraX;
      const rayDirY = player.dirY + player.planeY * cameraX;

      let mapX = Math.floor(player.x);
      let mapY = Math.floor(player.y);

      const deltaX = rayDirX === 0 ? 1e30 : Math.abs(1 / rayDirX);
      const deltaY = rayDirY === 0 ? 1e30 : Math.abs(1 / rayDirY);

      let stepX: number, stepY: number;
      let sideDistX: number, sideDistY: number;

      if (rayDirX < 0) {
        stepX = -1;
        sideDistX = (player.x - mapX) * deltaX;
      } else {
        stepX = 1;
        sideDistX = (mapX + 1 - player.x) * deltaX;
      }

      if (rayDirY < 0) {
        stepY = -1;
        sideDistY = (player.y - mapY) * deltaY;
      } else {
        stepY = 1;
        sideDistY = (mapY + 1 - player.y) * deltaY;
      }

      let side = 0;
      let hit = false;

      while (
        mapX >= 0 &&
        mapX < MAP[0].length &&
        mapY >= 0 &&
        mapY < MAP.length
      ) {
        if (MAP[mapY][mapX] > 0) {
          hit = true;
          break;
        }

        if (sideDistX < sideDistY) {
          sideDistX += deltaX;
          mapX += stepX;
          side = 0;
        } else {
          sideDistY += deltaY;
          mapY += stepY;
          side = 1;
        }
      }

      if (!hit) continue;

      const dist =
        side === 0
          ? (mapX - player.x + (1 - stepX) / 2) / rayDirX
          : (mapY - player.y + (1 - stepY) / 2) / rayDirY;

      if (!isFinite(dist) || dist <= 0) continue;

      const lineHeight = Math.floor(h / dist);

      const start = Math.max(0, Math.floor(h / 2 - lineHeight / 2));
      const end = Math.min(h - 1, Math.floor(h / 2 + lineHeight / 2));

      let wallX =
        side === 0 ? player.y + dist * rayDirY : player.x + dist * rayDirX;

      wallX -= Math.floor(wallX);

      let texX = Math.floor(wallX * TEXTURE_SIZE);
      texX = ((texX % TEXTURE_SIZE) + TEXTURE_SIZE) % TEXTURE_SIZE;

      if (side === 0 && rayDirX > 0) texX = TEXTURE_SIZE - texX - 1;
      if (side === 1 && rayDirY < 0) texX = TEXTURE_SIZE - texX - 1;

      const step = TEXTURE_SIZE / lineHeight;
      let texPos = (start - h / 2 + lineHeight / 2) * step;

      const shade = side === 1 ? 0.6 : 1;

      for (let y = start; y <= end; y++) {
        const texY =
          ((Math.floor(texPos) % TEXTURE_SIZE) + TEXTURE_SIZE) % TEXTURE_SIZE;

        texPos += step;

        const ti = (texY * TEXTURE_SIZE + texX) * 4;
        const light = shade / (1 + dist * dist * 0.002);

        if (ti >= 0 && ti < this.wallTex.length) {
          setPixel(
            x,
            y,
            this.wallTex[ti] * light,
            this.wallTex[ti + 1] * light,
            this.wallTex[ti + 2] * light,
          );
        }
      }
    }

    this.ctx.putImageData(frame, 0, 0);

    const gunW = this.canvas.width * 0.4;
    const gunH = gunW * 0.75;

    const bob = Math.sin(performance.now() * 0.005) * 5;

    const x = this.canvas.width / 2 - gunW / 2;
    const y = this.canvas.height - gunH + bob;

    this.ctx.drawImage(this.gunImage, x, y, gunW, gunH);
  }
}
