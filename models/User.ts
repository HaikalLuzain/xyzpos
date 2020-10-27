import mongoose, { Schema, Document, Model, model } from 'mongoose'
import uuid from 'uuid'
import { User } from 'types'

mongoose.models = mongoose.models || {}

export const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid.v4,
    },
    name: {
      type: String,
      minlength: 10,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: {} }
)

export interface UserDocument extends Omit<User, '_id'>, Document {}

export const UserModel: Model<UserDocument> =
  mongoose.models.User || model<UserDocument>('User', UserSchema)
