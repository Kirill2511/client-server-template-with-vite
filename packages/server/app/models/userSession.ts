import { UserSession, user_session } from "../config/db.config";
import type { Model, ModelAttributes } from "sequelize";
// import { DataType } from "sequelize-typescript";




  export const UserSessionModel: ModelAttributes<Model> = {
    // userID: {
    //   type: DataType.DECIMAL,
    // },
    // sid: {
    //   type: DataType.STRING,
    // }
    // sid: { type: DataType.STRING, allowNull: false, primaryKey: true },
    // sess: { type: DataType.JSON, allowNull: false },
    // expire: { type: DataType.DATE, allowNull: false },
    }


  export async function getAllSessions() {
    return UserSession.findAll();
  }

  export async function getTheSess() {
    return user_session.findAll();
  }
