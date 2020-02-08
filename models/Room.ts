import { Table, Column, Model, CreatedAt } from "sequelize-typescript";
import { DataType } from "sequelize-typescript";
import { User } from "./User";

@Table
export class Room extends Model<Room> {
  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  owner: string;

  @Column({ type: DataType.STRING })
  userList?: string;

  @CreatedAt
  @Column({ type: DataType.DATE })
  createdAt: Date;
}
