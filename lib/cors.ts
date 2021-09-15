import cors, { CorsOptions, CorsOptionsDelegate } from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

export const corsOptions: CorsOptions = {
  credentials: true,
  origin: 'https://localhost:3000',
  //origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Accept',
    'Accept-Encoding',
    'Content-Length',
    'Content-Type',
    'Date',
  ]
}

function initMiddleware(middleware: typeof cors) {
  return (req: NextApiRequest, res: NextApiResponse, options?: CorsOptions | CorsOptionsDelegate) =>
    new Promise((resolve, reject) => {
      middleware(options)(req, res, (result: Error | unknown) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}

export const nextCors = initMiddleware(cors)
