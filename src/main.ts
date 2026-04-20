import { Input } from "./core/input";
import { GameLoop } from "./core/loop";
import { Game } from "./game/game";
import { createPlayer } from "./game/player";
import { createPerlin4D } from "./graphics/perlin";
import { generateTexture } from "./graphics/texture";
import { Renderer } from "./render/renderer";
import "./style.css";

const ui = document.getElementById("ui") as HTMLDivElement;

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

let started = false;
window.addEventListener("keydown", (e) => {
  if (!started && e.key !== "Shift" && e.key !== "Control") {
    started = true;
    ui.style.display = "none";
  }
});

const noise = createPerlin4D();

const wallTex = generateTexture(
  noise,
  [0, 0, 0, 0],
  1.8,
  [40, 35, 30],
  [200, 185, 155],
);

const floorTex = generateTexture(
  noise,
  [10, 0, 0, 0],
  2.4,
  [55, 45, 30],
  [105, 90, 60],
);

const ceilTex = generateTexture(
  noise,
  [0, 0, 10, 0],
  1.5,
  [18, 18, 24],
  [52, 50, 62],
);

const gunImage = new Image();
gunImage.src = "/gun.png";

const player = createPlayer();
const input = new Input();
const game = new Game(player, input);

const renderer = new Renderer(
  ctx,
  canvas,
  wallTex,
  floorTex,
  ceilTex,
  gunImage,
);

const loop = new GameLoop((dt) => {
  game.update(dt);
  renderer.render(player);
});

loop.start();
