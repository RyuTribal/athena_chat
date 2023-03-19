import conn from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const email = req.body.email;
    const query = "delete from chat_history where email = $1";
    const values = [email];
    const result = await conn.query(query, values);
    if (result instanceof Error) {
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(200).json({ message: "Chat cleared" });
    }
  }
}
