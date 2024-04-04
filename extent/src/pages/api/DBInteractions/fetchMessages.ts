import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';

async function getConvoMessages(convoId: string) {
    const conversation = await db.conversation.findUnique(
        { where: { id: convoId },
        include: { chats: true} 

    
    });
    return conversation?.chats;
}

export default async function handler(
    
        req: NextApiRequest,
        res: NextApiResponse
     
){
const convoId = req.query.convoId as string;
if (typeof convoId !== 'string') {
    return res.status(400).json({ error: 'User ID must be a string' });
  }

  try {
    const conversations = await getConvoMessages(convoId);
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
}