// src/core/input.ts
export class Input {
  private keys: Record<string, boolean> = {};

  constructor() {
    window.addEventListener("keydown", (e) => (this.keys[e.key] = true));
    window.addEventListener("keyup", (e) => (this.keys[e.key] = false));
  }

  isDown(key: string) {
    return !!this.keys[key];
  }
}
