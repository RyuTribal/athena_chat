import { Box, Typography, Avatar, CircularProgress, Grid } from "@mui/material";
import React from "react";
import { History } from "@/types";
import athena from "@/images/athena.png";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import theme from "@/theme/theme";
import Image from "next/image";

export default function ChatHistory(props: any) {
  const chat_history = [...props.chat].reverse();
  if (props.loading && props.active !== 0) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px 24px",
          overflowY: "auto",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else if (props.active === 0) {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "16px 24px",
          overflowY: "auto",
        }}
      >
        <Typography textAlign="center" variant="h4">
          Athena
        </Typography>
        <Grid container spacing={1} sx={{ padding: "16px 24px" }}>
          <Grid
            item
            md={4}
            xs={12}
            sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Typography textAlign="center" variant="h6">
              Examples
            </Typography>
            <Typography
              sx={{
                color: "font.main",
                wordWrap: "break-word",
                backgroundColor: "background.default",
                padding: "8px",
                borderRadius: "8px",
              }}
              variant="body1"
            >
              How do I insert something in postgres?
            </Typography>
            <Typography
              sx={{
                color: "font.main",
                wordWrap: "break-word",
                backgroundColor: "background.default",
                padding: "8px",
                borderRadius: "8px",
              }}
              variant="body1"
            >
              Generate an image of cute cats
            </Typography>
            <Typography
              sx={{
                color: "font.main",
                wordWrap: "break-word",
                backgroundColor: "background.default",
                padding: "8px",
                borderRadius: "8px",
              }}
              variant="body1"
            >
              What&apos;s new in Sweden?
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
            sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Typography textAlign="center" variant="h6">
              Capabilities
            </Typography>
            <Typography
              sx={{
                color: "font.main",
                wordWrap: "break-word",
                backgroundColor: "background.default",
                padding: "8px",
                borderRadius: "8px",
              }}
              variant="body1"
            >
              Remember what user said earlier in the conversation
            </Typography>
            <Typography
              sx={{
                color: "font.main",
                wordWrap: "break-word",
                backgroundColor: "background.default",
                padding: "8px",
                borderRadius: "8px",
              }}
              variant="body1"
            >
              Generates images based on input
            </Typography>
            <Typography
              sx={{
                color: "font.main",
                wordWrap: "break-word",
                backgroundColor: "background.default",
                padding: "8px",
                borderRadius: "8px",
              }}
              variant="body1"
            >
              Real time google scraping
            </Typography>
            <Typography
              sx={{
                color: "font.main",
                wordWrap: "break-word",
                backgroundColor: "background.default",
                padding: "8px",
                borderRadius: "8px",
              }}
              variant="body1"
            >
              Can analyze images provided by url
            </Typography>
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
            sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Typography textAlign="center" variant="h6">
              Limitations
            </Typography>
            <Typography
              sx={{
                color: "font.main",
                wordWrap: "break-word",
                backgroundColor: "background.default",
                padding: "8px",
                borderRadius: "8px",
              }}
              variant="body1"
            >
              May occasionally generate incorrect information
            </Typography>
            <Typography
              sx={{
                color: "font.main",
                wordWrap: "break-word",
                backgroundColor: "background.default",
                padding: "8px",
                borderRadius: "8px",
              }}
              variant="body1"
            >
              May occasionally produce harmful instructions or biased content
            </Typography>
            <Typography
              sx={{
                color: "font.main",
                wordWrap: "break-word",
                backgroundColor: "background.default",
                padding: "8px",
                borderRadius: "8px",
              }}
              variant="body1"
            >
              Cannot guarantee quality of images
            </Typography>
          </Grid>
        </Grid>
        {props.thinking && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    );
  }
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column-reverse",
        padding: "16px 24px",
        overflowY: "auto",
      }}
    >
      {props.thinking && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {chat_history.map((message: History, index: number) => (
        <Box
          sx={{
            padding: "8px 0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: message.is_sent ? "flex-end" : "flex-start",
            height: "auto",
          }}
          key={index}
        >
          {!message.is_sent && (
            <Avatar sx={{ margin: "0px 8px" }} alt="athena" src={athena.src}>
              Athena
            </Avatar>
          )}
          <Box
            sx={{
              backgroundColor: message.is_sent ? "primary.main" : "athena",
              padding: "8px 16px",
              borderRadius: "16px",
            }}
          >
            <Typography
              sx={{ color: "font.main", wordWrap: "break-word" }}
              variant="body1"
            >
              <ReactMarkdown
                rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSanitize]}
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      style={{ color: theme.palette.primary.main }}
                      target="_blank"
                      rel="noreferrer"
                      {...props}
                    />
                  ),
                }}
              >
                {message.message}
              </ReactMarkdown>
            </Typography>
            {message.images && (
              <Grid container spacing={1}>
                {message.images.map((image: string, index: number) => (
                  <Grid
                    component="a"
                    href={image}
                    target="_blank"
                    rel="noreferrer"
                    item
                    xs={12}
                    sm={6}
                    key={index}
                  >
                    <img alt="generated image" src={image} style={{ width: "100%" }} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
          {message.is_sent && props.user && (
            <Avatar
              sx={{ margin: "0px 8px" }}
              alt={props.user.name}
              src={props.user.image}
            >
              {props.user.name}
            </Avatar>
          )}
        </Box>
      ))}
    </Box>
  );
}
