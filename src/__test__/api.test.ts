import request from "supertest";
import { server } from "../index";
// import "@babel/polyfill";

describe("Test API", () => {
  it("Get all records with a GET api/users request (an empty array is expected)", () => {
    request(server)
      .get("/api/users")
      .then((res) => {
        expect(res.body).toEqual([]);
      });
  });

  it("A new object is created by a POST api/users request (a response containing newly created record is expected)", async () => {
    const user = { username: "Fido", age: 20, hobbies: ["one"] };
    crypto.randomUUID = jest.fn().mockImplementation(() => 42);
    const resUser = { id: 42, ...user };

    const response = await request(server)
      .post("/api/users")
      .send(JSON.stringify(user));
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 42, ...user });
  });

  it("With a GET api/user/{userId} request, we try to get the created record by its id (the created record is expected)", async () => {
    const user = { username: "Alex", age: 20, hobbies: ["one"] };
    crypto.randomUUID = jest.fn().mockImplementation(() => 100);

    const response = await request(server)
      .post("/api/users")
      .send(JSON.stringify(user));

    const response2 = await request(server).get("/api/users/100");
    expect(response.body).toEqual({ id: 100, ...user });
  });

  it("With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)", async () => {
    const user = { username: "Alex", age: 20, hobbies: ["one"] };
    crypto.randomUUID = jest.fn().mockImplementation(() => 100);

    const response = await request(server).post("/api/users").send(user);
    const response2 = await request(server).delete("/api/users/100");
    const response3 = await request(server).get("/api/users/100");
    expect(response3.body).toBeNull;
  });
});
