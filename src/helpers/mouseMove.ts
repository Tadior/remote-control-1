import { LEGENDARY } from "../consts/LEGENDARY";
import { mouse, up, down, left, right } from "@nut-tree/nut-js";

type MouseLegend = keyof typeof LEGENDARY;

export const mouseMove = (command: MouseLegend, position: number): void => {
  let func = new Function();
  switch (command) {
    case LEGENDARY.mouse_up:
      func = up;
      break;
    case LEGENDARY.mouse_down:
      func = down;
      break;
    case LEGENDARY.mouse_left:
      func = left;
      break;
    case LEGENDARY.mouse_right:
      func = right;
      break;
  }
  mouse.move(func(Number(position)));
};
