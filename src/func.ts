import { UUID } from "crypto";
import {
  allUsers,
  deleteUser,
  find,
  findAll,
  createNewUser,
  update,
} from "./crud";
import { ReqType, ResType, User, UserProp } from "./types";
import { err400, err404, error404IdNotExist, error500 } from "./errors";

export function isAnEmployeeUser(obj: any): obj is UserProp {
  if (Array.isArray(obj.hobbies)) {
    return (
      obj.hobbies.filter((i: string) => typeof i !== "string").length === 0 &&
      Object.keys(obj).length === 3 &&
      typeof obj.username == "string" &&
      typeof obj.age == "number"
    );
  } else {
    return false;
  }
}

export function switchRouter(router: string[], req: ReqType, res: ResType) {
  let id: UUID;
  const checkIdAfterUsers = router[1].split("/api/users/")[1];

  const regex = new RegExp(
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
  );

  const mathcId = checkIdAfterUsers?.match(regex);
  if (mathcId) {
    id = mathcId[0] as UUID;
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].id === id && req.method === "GET") {
        getApiUsersId(req, res, id);
        return;
      }
      if (allUsers[i].id === id && req.method === "DELETE") {
        deleteApiUsersId(req, res, id);
        return;
      }
      if (allUsers[i].id === id && req.method === "PUT") {
        putUpdate(req, res, id);
        return;
      }
    }
  }

  const route = JSON.stringify(router);
  try {
    switch (route) {
      case JSON.stringify(["GET", "/api/users"]): {
        getApiUsers(req, res);
        break;
      }
      case JSON.stringify(["POST", "/api/users"]): {
        postOnpost(req, res);
        break;
      }

      case JSON.stringify(["GET", "/favicon.ico"]): {
        favicon(req, res);
        break;
      }
      case JSON.stringify(["GET", "/favicon.ico"]): {
        favicon(req, res);
        break;
      }
      default: {
        if (checkIdAfterUsers && mathcId) {
          error404IdNotExist(req, res);
          break;
        }
        if (checkIdAfterUsers && !mathcId) {
          err400(req, res);
          break;
        }
        err404(req, res);
      }
    }
  } catch {
    error500(req, res);
  }
}

function favicon(req: ReqType, res: ResType) {
  res.setHeader("Content-Type", "plane/text");
}
async function getApiUsers(req: ReqType, res: ResType) {
  const users = await findAll();

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("x-api-key", "");

  res.end(JSON.stringify(users));
}

async function deleteApiUsersId(req: ReqType, res: ResType, id: UUID) {
  const user = await deleteUser(id);

  res.statusCode = 204;
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify({ message: "Record is found and deleted" }));
}
async function getApiUsersId(req: ReqType, res: ResType, id: UUID) {
  const user = await find(id);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");

  res.end(JSON.stringify(user));
}

async function postOnpost(req: ReqType, res: ResType) {
  let data: string = "";

  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  req.on("end", async () => {
    const body = JSON.parse(data);
    const isAnEmployee = isAnEmployeeUser(body);

    res.setHeader("Content-Type", "application/json");
    if (isAnEmployee) {
      const newUser = await createNewUser(body);

      res.statusCode = 201;
      res.end(JSON.stringify(newUser));
    } else {
      const errMsg = JSON.stringify({
        Error: "Error 400. Request body does not contain required fields",
      });
      res.statusCode = 400;
      res.end(errMsg);
    }
  });
}

async function putUpdate(req: ReqType, res: ResType, id: UUID) {
  let data: string = "";

  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  req.on("end", async () => {
    const body = JSON.parse(data);
    const isAnEmployee = isAnEmployeeUser(body);

    res.setHeader("Content-Type", "application/json");
    if (isAnEmployee) {
      const newUser = await update(id, body);

      res.statusCode = 200;
      res.end(JSON.stringify(newUser));
    } else {
      const errMsg = JSON.stringify({
        Error: "Error 400. Request body does not contain required fields",
      });
      res.statusCode = 400;
      res.end(errMsg);
    }
  });
}
