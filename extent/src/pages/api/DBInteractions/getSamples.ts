import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
    if (req.method === 'GET') {
        try {
          const samples = await prisma.sample.findMany();
          res.status(200).json(samples);
        } catch (error) {
          res.status(500).json({ error: "Failed to fetch samples" });
        }
      } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
}