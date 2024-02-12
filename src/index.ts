import * as dotenv from "dotenv";
import { createServer } from "http";
import { switchRouter } from "./func";

dotenv.config();
const PORT = parseInt(process.env.PORT as string, 10) || 4000;

export const server = createServer();

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
