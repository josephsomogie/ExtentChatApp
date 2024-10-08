import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";

async function getUserConversations(userId: string) {
  const userWithConversations = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      conversations: {
        include: {
          users: true,
          chats: false,
          //creatorId: false,
        },
      },
    },
  });

  return userWithConversations?.conversations;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const userId = req.query.userId as string;
  if (typeof userId !== "string") {
    return res.status(400).json({ error: "User ID must be a string" });
  }

  try {
    const conversations = await getUserConversations(userId);
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
}
