import conn from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const chat_id = req.body.chat_id;
    const message = req.body.message;
    const history = req.body.history;

    const writesonic_query = await axios({
      method: "POST",
      url: process.env.WRITESONIC_API_URL,
      data: {
        enable_google_results: "true",
        enable_memory: true,
        input_text: message,
        history_data: history,
      },
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-API-KEY": process.env.WRITESONIC_API_KEY,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });

    console.log(writesonic_query);

    if (writesonic_query.status !== 200) {
      return res.status(500).json({
        message: "Internal server error: Failed at the write sonic step",
      });
    }

    let query = "";
    let values = [];

    if (chat_id === 0) {
      query =
        "INSERT INTO chat_history (email, chat_history, title) VALUES ($1, $2, $3) RETURNING *";
      values = [
        req.body.email,
        [
          ...history,
          { is_sent: true, message: message },
          {
            is_sent: false,
            message: writesonic_query.data.message,
            images: writesonic_query.data.image_urls,
          },
        ],
        message,
      ];
    } else {
      query =
        "UPDATE chat_history SET chat_history = $1 WHERE id = $2 RETURNING *";
      values = [
        [
          ...history,
          { is_sent: true, message: message },
          {
            is_sent: false,
            message: writesonic_query.data.message,
            images: writesonic_query.data.image_urls,
          },
        ],
        chat_id,
      ];
    }

    const result = await conn.query(query, values);
    if (result instanceof Error) {
      return res
        .status(500)
        .json({ message: "Internal server error: Failed to update history" });
    } else {
      return res.status(200).json({ chat: result.rows });
    }
  }
}
