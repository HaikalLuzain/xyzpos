import { ProductModel } from 'models/Product'
import { ProductOrderModel } from 'models/ProductOrder'
import { UserModel } from 'models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import { Product } from 'types'
import { ProductOrder } from 'types/order'
import { generateHash } from 'utils/password'
import { ResponseInternalError } from 'utils/response'
import uuid from 'uuid'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await UserModel.deleteMany({})
    await ProductModel.deleteMany({})
    await ProductOrderModel.deleteMany({})

    const user = await UserModel.create({
      name: 'Haikal Fikri Luzain',
      email: 'haikal@gmail.com',
      password: await generateHash('blahblah'),
    })

    const product = [
      {
        _id: uuid.v4(),
        name: 'Kipas Angin',
        qty: 100,
        price: 100000,
        user: user._id,
      },
      {
        _id: uuid.v4(),
        name: 'Sapu Ijuk',
        qty: 200,
        price: 10000,
        user: user._id,
      },
      {
        _id: uuid.v4(),
        name: 'Rinso',
        qty: 500,
        price: 35000,
        user: user._id,
      },
      {
        _id: uuid.v4(),
        name: 'Molto',
        qty: 500,
        price: 35000,
        user: user._id,
      },
      {
        _id: uuid.v4(),
        name: 'Telur Ayam Kampung',
        qty: 100,
        price: 75000,
        user: user._id,
      },
    ] as Array<Product>

    const order = [
      {
        customer: 'Budi Cahyadi',
        product: product[0]._id,
        price: product[0].price,
        qty: 1,
        total: product[0].price * 1,
        user: user._id,
      },
      {
        customer: 'Ahamad Santoso',
        product: product[1]._id,
        price: product[1].price,
        qty: 2,
        total: product[1].price * 2,
        user: user._id,
      },
      {
        customer: 'Yulia',
        product: product[2]._id,
        price: product[2].price,
        qty: 4,
        total: product[2].price * 4,
        user: user._id,
      },
      {
        customer: 'Evelyn',
        product: product[3]._id,
        price: product[3].price,
        qty: 4,
        total: product[3].price * 4,
        user: user._id,
      },
      {
        customer: 'Tara',
        product: product[4]._id,
        price: product[4].price,
        qty: 1,
        total: product[4].price * 1,
        user: user._id,
      },
    ] as Array<ProductOrder>

    await ProductModel.create(product)
    const productOrder = await ProductOrderModel.create(order)

    return res.json({
      success: true,
      user,
      product,
      productOrder,
    })
  } catch (error) {
    console.log(error)
    ResponseInternalError(res)
  }
}
