import { User } from './user'

export interface Product {
  _id?: string
  name: string
  qty: number
  price: number
  user: User | string
}
