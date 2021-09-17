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

  console.log('body:', req.body);
  console.log('cookie:', req.cookies);

  // ID と Pass で認証
  const user = {
    id: 'demo',
    pass: 'test',
  }
  const isLogin = req.body.id === user.id && req.body.pass === user.pass;

  if (req.headers.origin === corsOptions.origin && isLogin) {
    res.setHeader('Set-Cookie', [
      `sid=${getSessionId()}`,
      'Domain=127.0.0.1',
      'Path=/',
      `Max-Age=${60 * 60}`,
      'HttpOnly',
      'Secure',
      'SameSite=None'
    ].join(';'))
    res.json({ login: true, code: 200, message: 'sucess' })
  } else if(!isLogin) {
    // Cookieは削除？
    res.json({ login: false, code: 401, message: 'Unauthorized' })
  } else {
    // Cookieは削除？
    res.json({ login: false, code: 403, message: 'Forbidden' })
  }
}
