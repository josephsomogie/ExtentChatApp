
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
import { db } from '~/server/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){

  const session = await getServerSession(req, res, authOptions);
  if(!session){
    res.status(401).json({error:"Unauthorized"});
    return;

}
    if (req.method === 'GET') {
        try {
          const samples = await db.sample.findMany();
          res.status(200).json(samples);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch samples" });
        }
      } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
}