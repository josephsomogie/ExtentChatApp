import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "~/server/db";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

async function createFriendship(senderId: string, friendId: string) {
  const existingFriendship = await db.friendship.findFirst({
    where: {
      OR: [
        { senderId: senderId, friendId: friendId },
        { senderId: friendId, friendId: senderId },
      ],
    },
  });

  if (existingFriendship) {
    throw new Error("Friendship already exists");
  }

  await db.friendship.create({
    data: {
      senderId,
      friendId,
      accepted: false, // Set to false by default; needs to be accepted by the friend
    },
  });
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
  if (req.method === "POST") {
    try {
      const { senderId, friendId } = req.body;
      if (!senderId || !friendId) {
        return res
          .status(400)
          .json({ message: "Missing senderId or friendId in request body" });
      }

      await createFriendship(senderId, friendId);
      res.status(201).json({ message: "Friendship request sent successfully" });
    } catch (error: any) {
      console.error("Failed to create friendship:", error);
      res
        .status(500)
        .json({ message: "Failed to create friendship", error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
