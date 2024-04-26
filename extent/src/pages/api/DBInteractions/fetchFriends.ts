import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

async function fetchFriends(userId: string) {
  const friends = await db.friendship.findMany({
    where: {
      AND: [
        {
          OR: [{ friendId: userId }, { senderId: userId }],
        },
        { accepted: true },
      ],
    },
    select: {
      sender: true, // select the whole sender User object
      friend: true, //  select the whole friend User object
    },
  });
  return friends;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  const userId = req.query.userId as string;
  if (!session || session?.user.id !== userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } else if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end("Method Not Allowed");
    return;
  } else {
    const friendReqs = await fetchFriends(userId);
    res.status(200).json(friendReqs);
  }
}
