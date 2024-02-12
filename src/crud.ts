import { UUID } from "crypto";
import { AllUsersType, User, UserProp } from "./types";

export const allUsers: AllUsersType = [];

export const findAll = async (): Promise<AllUsersType> => {
  return allUsers;
};
export const find = async (id: UUID): Promise<User> => {
  return allUsers.filter((user) => user.id === id)[0];
};
export const createNewUser = async (body: UserProp): Promise<User> => {
  const id = crypto.randomUUID();
  const newUser: User = { ...body, id };

  allUsers[allUsers.length] = newUser;
  return newUser;
};
export const deleteUser = async (id: UUID): Promise<void> => {
  for (let i = 0; allUsers.length; i++) {
    if (allUsers[i].id === id) {
      allUsers.splice(i, 1);
    }
  }
};

export const update = async (id: UUID, userUpdate: UserProp): Promise<User> => {
  const userId = await getIdx(id);
  allUsers[userId] = { id, ...userUpdate };
  return allUsers[userId];
};

const getIdx = async (id: UUID): Promise<any> => {
  for (let i = 0; allUsers.length; i++) {
    if (allUsers[i].id === id) {
      return i;
      break;
    }
  }
};
