// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { ProductOrderModel } from 'models/ProductOrder'
import { NextApiRequest, NextApiResponse } from 'next'
import nextMiddleware from 'utils/nextMiddleware'
import { ResponseInternalError } from 'utils/response'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await nextMiddleware(req, res)

    const order = await ProductOrderModel.find().populate('product')
    return res.json({ order })
  } catch (error) {
    console.log(error)
    ResponseInternalError(res)
  }
}
