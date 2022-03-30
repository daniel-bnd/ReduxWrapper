import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await axios
      .get('http://dev.codeleap.co.uk/careers/?offset=70')
      .then(response => {
        res.status(200).json(response.data.results)
      })
      .catch(err => res.status(400).json(err))
  } catch {
    res.status(400).json({ error: 'Something is wrong' })
  }
}

export const config = {
  api: {
    externalResolver: true
  }
}
