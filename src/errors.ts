import { ReqType, ResType } from "./types";

export function error404IdNotExist(req: ReqType, res: ResType) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      Error:
        "404 - Sorry. The user with this ID does not exist in the database.",
    })
  );
}

export function error500(req: ReqType, res: ResType) {
  res.statusCode = 500;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      Eror: "500 - Internal Server Error. Sorry, this not working propertly. We now know about this mistake and are working to fix it.",
    })
  );
}

export function err400(req: ReqType, res: ResType) {
  res.writeHead(400, "Content-Type:application/json");
  res.end(
    JSON.stringify({
      Error: "400 - Sorry. The ID is incorrect, it should be UUID",
    })
  );
}

export function err404(req: ReqType, res: ResType) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      Error: "404 - OOPS! Sorry, we can't find the page you're loking for.",
    })
  );
}
