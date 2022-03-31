import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default function signInRequest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('codeleap', 'none', {
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 1,
        path: '/'
      })
    )
    res.status(200).end()
  } else {
    res.status(404).end()
  }
}
export const config = {
  api: {
    externalResolver: true
  }
}
