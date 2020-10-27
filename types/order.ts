import { Product } from './product'
import { User } from './user'

export interface ProductOrder {
  _id?: string
  customer: string
  product: Product | any
  price: number
  qty: number
  total: number
  user: User | string
  createdAt?: Date
  updatedAt?: Date
}
