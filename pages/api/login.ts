import type { NextApiRequest, NextApiResponse } from 'next'
import { nextCors, corsOptions } from '../../lib/cors'
import { getSessionId } from '../../lib/session'

type Data = {
  login: boolean
  code: number
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await nextCors(req, res, corsOptions)

  // 本来は ID と Pass で認証
  const isLogin = true;

  if (req.headers.origin === corsOptions.origin && isLogin) {
    res.setHeader("Set-Cookie", [
      `sid=${getSessionId()}`,
      'Domain=localhost',
      'Path=/',
      'HttpOnly',
      'Secure',
      'SameSite=None'
    ].join(';'))
    res.json({ login: true, code: 200, message: 'sucess' })
  } else {
    // Cookieは削除？
    res.json({ login: false, code: 403, message: 'Forbidden' })
  }
}
