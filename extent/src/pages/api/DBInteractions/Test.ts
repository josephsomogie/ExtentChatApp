import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { data } = req.body;
    try {
      const newSample = await prisma.sample.create({
        data: {
          data, // Assuming "data" is the name of the field in your request body
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