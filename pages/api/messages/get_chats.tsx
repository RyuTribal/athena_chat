import conn from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user_email = req.body.email;
    const query = "SELECT id, title FROM chat_history WHERE email = $1";
    const values = [user_email];
    const result = await conn.query(query, values);
    if (result instanceof Error) {
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(200).json({ chats: result.rows });
    }
  }
}
