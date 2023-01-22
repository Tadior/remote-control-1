import { httpServer } from "./src/http_server/index";
import { WebSocketServer } from "ws";
import { LEGENDARY } from "./src/consts/LEGENDARY";
import { MOUSE_LEGENDARY } from "./src/consts/MOUSE_LEGENDARY";
import { mouseMove } from "./src/helpers/mouseMove";
import { drawCircle } from "./src/helpers/drawCircle";
import { mouse } from "@nut-tree/nut-js";
import { drawRectangle } from "./src/helpers/drawRectangle";
import { drawSquare } from "./src/helpers/drawSquare";
import { getScreen } from "./src/helpers/screen";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", async function message(data) {
    const dataInfo = data.toString().split(" ");
    const command = dataInfo[0] as keyof typeof LEGENDARY;
    let commandOutput = `${command}`;
    dataInfo.shift();
    const values = dataInfo.map((element) => Number(element));
    if (MOUSE_LEGENDARY.includes(command)) {
      mouseMove(command, values[0]);
    }
    switch (LEGENDARY[command]) {
      case LEGENDARY.mouse_position:
        const { x, y } = await mouse.getPosition();
        commandOutput = `mouse_position ${x},${y}`;
        break;
      case LEGENDARY.draw_circle:
        drawCircle(values[0]);
        break;
      case LEGENDARY.draw_rectangle:
        drawRectangle(values);
        break;
      case LEGENDARY.draw_square:
        drawSquare(values[0]);
        break;
      case LEGENDARY.prnt_scrn:
        getScreen(ws);
        // ws.send(screen);
        break;
    }
    console.log("received: %s", data);
    if (commandOutput !== LEGENDARY.prnt_scrn) {
      ws.send(commandOutput);
    }
  });
});

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
