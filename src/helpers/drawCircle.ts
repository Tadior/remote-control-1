import { Button, Point, mouse, straightTo } from "@nut-tree/nut-js";

export const drawCircle = async (value: number) => {
  const radius = value;
  const { x: currentX, y: currentY } = await mouse.getPosition();
  const centerX = currentX + radius;
  const centerY = currentY;
  await mouse.pressButton(Button.LEFT);
  for (let i = 0; i <= 2 * Math.PI; i += 0.1) {
    const coordX = centerX - radius * Math.cos(i);
    const coordY = centerY - radius * Math.sin(i);
    // eslint-disable-next-line no-await-in-loop
    await mouse.move(straightTo(new Point(coordX, coordY)), () => -0.1);
  }
  await mouse.releaseButton(Button.LEFT);
};
