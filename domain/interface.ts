export interface Message {
  id: string;
  color: string;
  msg: string;
}

export interface dbUser {
  email: string;
  nickname: string;
  snsId: string;
  provider: string;
  socketId?: string;
}

export interface dbRoom {
  title: string;
  owner: string;
  userList: string;
}
