import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
 

  if (req.method === 'POST') {
    const { data, userID } = req.body;
    try {
      const newSample = await db.sample.create({
        data: {
          data, 
          userID
        },
      });
      res.status(200).json(newSample);
    } catch (error) {
      res.status(500).json({ error: "Failed to create sample" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  
}