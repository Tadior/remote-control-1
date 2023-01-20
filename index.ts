import { httpServer } from "./src/http_server/index";
import { WebSocketServer } from "ws";
import { LEGENDARY } from "./src/consts/LEGENDARY";
import { MOUSE_LEGENDARY } from "./src/consts/MOUSE_LEGENDARY";
import { mouseMove } from "./src/helpers/mouseMove";
import { mousePosition } from "./src/helpers/mousePosition";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    const dataInfo = data.toString().split(" ");
    const command = dataInfo[0] as keyof typeof LEGENDARY;
    dataInfo.shift();
    if (MOUSE_LEGENDARY.includes(command)) {
      mouseMove(command, Number(dataInfo[0]));
    } else if (LEGENDARY[command] === LEGENDARY.mouse_position) {
      return mousePosition();
    }
    console.log("received: %s", data);
  });

  ws.send("something");
});

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);
