import * as dotenv from "dotenv";
import { createServer } from "http";
import { switchRouter } from "./func";

dotenv.config();
const PORT = parseInt(process.env.PORT as string, 10);

export const server = createServer();

console.log(process.env.NODE_ENV);
console.log(process.env.TS_NODE_DEV);

server
  .on("request", (req, res) => {
    const method = req.method!;
    let path = req.url!;

    if (path.endsWith("/")) {
      path = path.substring(0, path.lastIndexOf("/"));
    }

    switchRouter([method, path], req, res);
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
