import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from "~/server/db";

async function createChatMessage(convoId: string, userId: string, content: string, username:string): Promise<void> {
    if (!convoId.trim() || !userId.trim() || !content.trim()) {
        throw new Error('Conversation ID, user ID, and content must be provided and non-empty.');
    }

    try {
        const newChat = await db.chat.create({
            data: {
                convoId: convoId,
                userId: userId,
                content: content,
                username: username
                
            },
        });

        console.log('Chat created:', newChat);
    } catch (error) {
        console.error('Error creating chat message:', error);
        throw error; 
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    // Only allow POST requests for creating a new chat message
    if (req.method === 'POST') {
      try {
        const { convoId, userId, content, username } = req.body;
        
        // Validate the input
        if (typeof convoId !== 'string' || typeof userId !== 'string' || typeof content !== 'string') {
          return res.status(400).json({ message: 'Invalid or missing conversation ID, user ID, or content.' });
        }
  
        // Attempt to create the chat message
        await createChatMessage(convoId, userId, content, username);
  
        // If successful, send a 201 response
        res.status(201).json({ message: 'Chat message created successfully.' });
      } catch (error) {
        console.error('Failed to create chat message:', error);
        // Respond with a 500 Internal Server Error status if there's an exception
        res.status(500).json({ message: 'Failed to create chat message' });
      }
    } else {
      // Inform the client that only POST is allowed
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
