import { NextApiRequest, NextApiResponse } from 'next'
import newCheckRowOrColumn from './utils/newCheckRowOrColumn'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await newCheckRowOrColumn(
    //['', 'A', 'O', 'P', 'A', 'L', 'L', 'E', '', 'B'],
    ['', 'P', 'P', 'A', 'I', ''],
    3
  )

  console.log('Result from word check', result)

  res.status(200).json({ msg: 'Hei' })
}
