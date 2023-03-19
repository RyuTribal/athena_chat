import conn from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const chat_id = req.body.chat_id;
    const query = "SELECT chat_history FROM chat_history WHERE id = $1";
    const values = [chat_id];
    const result = await conn.query(query, values);
    if (result instanceof Error) {
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(200).json({ history: result.rows });
    }
  }
}
