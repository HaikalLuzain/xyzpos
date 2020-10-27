import mongoose, { Schema, Document, Model, model } from 'mongoose'
import uuid from 'uuid'
import { ProductOrder } from 'types/order'

mongoose.models = mongoose.models || {}

export const ProductOrderSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid.v4,
    },
    customer: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      default: uuid.v4,
      ref: 'Product',
    },
    price: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
    total: {
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

export interface ProductOrderDocument
  extends Omit<ProductOrder, '_id'>,
    Document {}

export const ProductOrderModel: Model<ProductOrderDocument> =
  mongoose.models.ProductOrder ||
  model<ProductOrderDocument>('ProductOrder', ProductOrderSchema)
