import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, email } = req.body

    const token = jwt.sign({ informations: [{ username, email }] }, SECRET, {
      expiresIn: 60 * 60
    })

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('codeleap', token, {
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/'
      })
    )
    res.status(200).json({ message: 'ok' })
  } catch {
    res.status(404).json({ error: 'error' })
  }
}

export const config = {
  api: {
    externalResolver: true
  }
}
