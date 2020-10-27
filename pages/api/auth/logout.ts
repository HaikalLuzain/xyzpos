import nextMiddleware, { NextApiRequestWithSession } from "utils/nextMiddleware";
import { NextApiResponse } from "next";
import { ResponseNotImplemented, ResponseUnauthorized, ResponseInternalError } from "utils/response";

export default async (req: NextApiRequestWithSession, res: NextApiResponse) => {
  try {

    req = await nextMiddleware(req, res)

    if (req.method !== 'DELETE') {
      ResponseNotImplemented(res)
    }

    if (!req.user) ResponseUnauthorized(res)

    req.session.destroy()

    return res.status(200).json({ message: 'Successfully logout' })
    
  } catch (error) {
    console.log(error)
    ResponseInternalError(res)
  }

}