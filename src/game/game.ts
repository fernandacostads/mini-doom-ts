import { MAP } from "../config/constants";
import type { Input } from "../core/input";
import type { Player } from "./player";

export class Game {
  private player: Player;
  private input: Input;

  constructor(player: Player, input: Input) {
    this.player = player;
    this.input = input;
  }

  update(dt: number) {
    if (this.input.isDown("ArrowLeft")) {
      this.rotate(this.player.rotSpeed * dt);
    }

    if (this.input.isDown("ArrowRight")) {
      this.rotate(-this.player.rotSpeed * dt);
    }

    let moveX = 0;
    let moveY = 0;

    if (this.input.isDown("ArrowUp") || this.input.isDown("w")) {
      moveX += this.player.dirX;
      moveY += this.player.dirY;
    }

    if (this.input.isDown("ArrowDown") || this.input.isDown("s")) {
      moveX -= this.player.dirX;
      moveY -= this.player.dirY;
    }

    if (moveX !== 0 || moveY !== 0) {
      const len = Math.hypot(moveX, moveY);
      moveX = (moveX / len) * this.player.moveSpeed * dt;
      moveY = (moveY / len) * this.player.moveSpeed * dt;

      const nx = this.player.x + moveX;
      const ny = this.player.y + moveY;

      if (MAP[Math.floor(ny)][Math.floor(this.player.x)] === 0) {
        this.player.y = ny;
      }

      if (MAP[Math.floor(this.player.y)][Math.floor(nx)] === 0) {
        this.player.x = nx;
      }
    }
  }

  private rotate(angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    const oldDirX = this.player.dirX;
    this.player.dirX = this.player.dirX * cos - this.player.dirY * sin;
    this.player.dirY = oldDirX * sin + this.player.dirY * cos;

    const oldPlaneX = this.player.planeX;
    this.player.planeX = this.player.planeX * cos - this.player.planeY * sin;
    this.player.planeY = oldPlaneX * sin + this.player.planeY * cos;
  }
}
