import { Table, Column, Model, CreatedAt } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";
import { Room } from "./Room";

@Table
export class User extends Model<User> {
  @Column({ type: DataType.STRING })
  email?: string;

  @Column({ type: DataType.STRING })
  nickname: string;

  @Column({ type: DataType.STRING })
  snsId: string;

  @Column({ type: DataType.STRING })
  provider: string;

  @Column({ type: DataType.STRING })
  socketId?: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;
}
