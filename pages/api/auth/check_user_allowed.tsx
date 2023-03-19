import conn from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const user_email = req.body.email;
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [user_email];
    const result = await conn.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    } else if (result instanceof Error) {
      return res.status(500).json({ message: "Internal server error" });
    } else {
      return res.status(200).json({ message: "User found" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
