import { Box, Typography, Divider, ButtonBase } from "@mui/material";
import React from "react";
import { Chat } from "@/types";
import { signOut } from "next-auth/react";

export default function Chats(props: any) {
  const { onClick, active } = props;

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 0,
      }}
    >
      <Typography sx={{ margin: "16px 0px 16px 0px" }} variant="h4">
        Chats
      </Typography>
      {props.chats.map((chat: Chat, index: number) => (
        <React.Fragment key={chat.id}>
          <ButtonBase
            disabled={active === index}
            onClick={() => onClick(index)}
            key={chat.id}
            sx={{
              width: "100%",
              border: index === 0 ? "2px solid #C7486A" : "none",
              margin: index === 0 ? "8px 0px 8px 0px" : "0px",
              "&:hover": { backgroundColor: "primary.hover" },
              padding: "16px 24px",
            }}
          >
            <Box>
              <Typography
                sx={{
                  color: active === index ? "primary.main" : "font.main",
                }}
                variant="h6"
              >
                {chat.title}
              </Typography>
            </Box>
          </ButtonBase>
          <Divider sx={{ width: "100%" }} />
        </React.Fragment>
      ))}
      <ButtonBase
        onClick={() => props.clearChats()}
        sx={{
          width: "100%",
          border: "2px solid #C7486A",
          borderColor: "error.main",
          padding: "16px 24px",
          "&:hover": { backgroundColor: "error.light" },
          marginTop: "auto",
          marginBottom: "16px",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "error.main",
            }}
            variant="h6"
          >
            Clear chats
          </Typography>
        </Box>
      </ButtonBase>
      <ButtonBase
        onClick={() => signOut({ callbackUrl: "https://athenachat.app/login" })}
        sx={{
          width: "100%",
          border: "2px solid #C7486A",
          alignSelf: "flex-end",
          borderColor: "error.main",
          padding: "16px 24px",
          "&:hover": { backgroundColor: "error.light" },
          marginBottom: "16px",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "error.main",
            }}
            variant="h6"
          >
            Log out
          </Typography>
        </Box>
      </ButtonBase>
    </Box>
  );
}
