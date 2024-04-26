import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '~/server/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';

async function pendingFriends(userId: string) {
  const friendRequests = await db.friendship.findMany({
    where: {
      AND: [{ friendId: userId }, { accepted: false }],
    },
    select: {
      sender: true,
    },
  });
  return friendRequests;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
const session =  await getServerSession(req, res, authOptions);
const userId = req.query.userId as string
    if(!session || session?.user.id !== userId){
        res.status(401).json({error:'Unauthorized'});
        return;
    }else if(req.method !== 'GET'){
      res.setHeader('Allow', ['GET']);
      res.status(405).end('Method Not Allowed');
      return;
    }else{
        const friendReqs = await pendingFriends(userId);
        res.status(200).json(friendReqs);
    }
}