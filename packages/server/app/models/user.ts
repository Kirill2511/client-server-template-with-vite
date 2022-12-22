import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IUser {
  firstName: string
  secondName: string
  displayName: string
  login: string
  email: string
  phone: string
  avatar: string
  role: 'admin' | 'user'
}

export const userModel: ModelAttributes<Model, IUser> = {
  firstName: {
    type: DataType.STRING,
    allowNull: true,
  },
  secondName: {
    type: DataType.STRING,
    allowNull: true,
  },
  displayName: {
    type: DataType.STRING,
    allowNull: true,
  },
  login: {
    type: DataType.STRING,
    allowNull: false,
  },
  email: {
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    }
  },
  phone: {
    type: DataType.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataType.STRING,
    allowNull: true,
  },
  role: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'user',
    validate: {
      isIn: [
        ['user', 'admin']
      ]
    }
  },
}
