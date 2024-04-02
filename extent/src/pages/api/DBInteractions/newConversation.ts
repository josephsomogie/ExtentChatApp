import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';


async function createUserConversation(name: string, users: string[], creator: string) {
  await db.conversation.create({
      data: {
          name: name,
          creatorId: creator,
          users: {
              connect: users.map(userId => ({ id: userId })),
          },
          //  connect existing chats or create new ones here
      },
  });
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ){
   
    if(req.method === 'POST'){
        try{
        const { name, users, creator } = req.body;
        if (!name || !users /*|| !Array.isArray(users)*/) {
            return res.status(400).json({ message: 'Missing or invalid name and/or users in request body' });
        }
        await createUserConversation(name, users, creator);
        res.status(201).json({ message: 'Conversation created successfully' });

        }catch(error){
            console.error('Failed to create conversation:', error);
            res.status(500).json({ message: 'Failed to create conversation' });
        }

  }else{
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

}