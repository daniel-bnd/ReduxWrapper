import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
const SECRET = process.env.SECRET

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      jwt.verify(req.cookies.codeleap!, SECRET, async function (err, decoded) {
        if (!err && decoded) {
          const token = req.cookies.codeleap
          const jwt_decoded: any = jwt.decode(token)
          res.status(200).json(jwt_decoded.informations[0])
        } else {
          res.status(401).json({ pqp: 'PUTA' })
        }
      })
    } catch {
      res.status(404).json({ message: 'deu merda' })
    }
  } else {
    res.status(404).end()
  }
}

export const config = {
  api: {
    externalResolver: true
  }
}
