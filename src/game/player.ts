export interface Player {
  x: number;
  y: number;
  dirX: number;
  dirY: number;
  planeX: number;
  planeY: number;
  moveSpeed: number;
  rotSpeed: number;
}

export const createPlayer = (): Player => ({
  x: 3.5,
  y: 3.5,
  dirX: -1,
  dirY: 0,
  planeX: 0,
  planeY: 0.66,
  moveSpeed: 3,
  rotSpeed: 2,
});
