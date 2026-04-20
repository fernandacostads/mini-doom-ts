export class GameLoop {
  private lastTime = 0;
  private update: (dt: number) => void;

  constructor(update: (dt: number) => void) {
    this.update = update;
  }

  start() {
    const loop = (time: number) => {
      const dt = (time - this.lastTime) / 1000;
      this.lastTime = time;

      this.update(dt);
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }
}
