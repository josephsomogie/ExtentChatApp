
import { db } from "~/server/db";
import type { NextApiRequest, NextApiResponse } from 'next';

async function searchUsernames(query: string): Promise<any> {
    // Ensure the search query is not empty and trim any whitespace
    if (!query.trim()) {
        return [];
    }

    const users = await db.user.findMany({
        where: {
            name: {
                contains: query,
                
            },
        },
        select: {
            id: true, //  return the user ID
            name: true, // And the username
            image: true, // The profile picture URL (optional)
            
        },
    });

    return users;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    // Only process GET requests
    if (req.method === 'GET') {
      try {
        const query = req.query.q as string; // Assuming you pass the search term as a query parameter named 'q'
        
        if (!query) {
          return res.status(400).json({ message: 'A search query is required.' });
        }
        
        const users = await searchUsernames(query);
        res.status(200).json(users);
      } catch (error) {
        console.error('Search operation failed:', error);
        res.status(500).json({ message: 'Failed to perform search operation.' });
      }
    } else {
      // Respond with method not allowed if not a GET request
      res.setHeader('Allow', ['GET']);
      res.status(405).end('Method Not Allowed');
    }
  }