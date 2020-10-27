import mongoose, { Schema, Document, Model, model } from 'mongoose'
import uuid from 'uuid'
import { Product } from 'types'

mongoose.models = mongoose.models || {}

export const ProductSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid.v4,
    },
    name: {
      type: String,
      required: true,
    },
    qty: {
      type: Number,
      default: 0,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: String,
      ref: 'User',
    },
  },
  { timestamps: {} }
)

export interface ProductDocument extends Omit<Product, '_id'>, Document {}

export const ProductModel: Model<ProductDocument> =
  mongoose.models.Product || model<ProductDocument>('Product', ProductSchema)
