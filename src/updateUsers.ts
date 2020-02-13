import { User } from "../models/User";
import { Room } from "../models/Room";

export const insertUser = async (
  roomId: number,
  users: string,
  snsId: string
): Promise<string> => {
  if (users === null) {
    users = `${snsId},`;
  } else {
    users += `${snsId},`;
  }

  await Room.update({ userList: users }, { where: { id: roomId } });

  return users;
};

export const deleteUser = async (
  roomId: number,
  users: string,
  snsId: string
): Promise<string> => {
  let curUsers = users.split(",");
  curUsers.pop();

  const idx: number = curUsers.indexOf(snsId);
  curUsers.splice(idx, 1);

  let userList: string = "";
  for (let i = 0; i < curUsers.length; ++i) {
    userList += `${curUsers[i]},`;
  }
  await Room.update({ userList: userList }, { where: { id: roomId } });

  return userList;
};

export const parseUsers = async (users: string): Promise<Array<string>> => {
  let resUsers: Array<string> = [];
  const curUsers: Array<string> = users.split(",");
  curUsers.pop();

  for (let i = 0; i < curUsers.length; ++i) {
    const user = await User.findOne({ where: { snsId: curUsers[i] } });
    resUsers.push(user.nickname);
  }

  return resUsers;
};
