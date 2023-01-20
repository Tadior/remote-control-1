import { mouse } from "@nut-tree/nut-js";

export const mousePosition = async () => {
  const currentPosition = await mouse.getPosition();
  return currentPosition;
};
