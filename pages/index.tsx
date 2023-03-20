import ChatHistory from "@/components/ChatHistory";
import Chats from "@/components/Chats";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  TextField,
  CircularProgress,
  SwipeableDrawer,
} from "@mui/material";
import { Menu, Send } from "@mui/icons-material";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

const check_user = async (email: any) => {
  let data = await axios({
    method: "POST",
    url: "api/auth/check_user_allowed",
    data: {
      email: email,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
  console.log(data.data);
  if (data.status !== 200) {
    signOut({ callbackUrl: "https://athenachat.app/login" });
  }
};

export default function Home() {
  const [selectedChat, setSelectedChat] = React.useState(0);
  const [chats, setChats] = React.useState([{ id: 0, title: "New Chat" }]);
  const [chatLoading, setChatLoading] = React.useState(false);
  const [history, setHistory] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  React.useEffect(() => {
    const get_chats = async () => {
      let data = await axios({
        method: "POST",
        url: "api/messages/get_chats",
        data: {
          email: session.user.email,
        },
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      if (data.status === 200) {
        setChats([{ id: 0, title: "New Chat" }, ...data.data.chats.reverse()]);
      }
    };

    if (status === "authenticated" && session.user) {
      if (session && session.user) {
        setUser(session.user);
      }
      get_chats();
    }
  }, [status]);

  React.useEffect(() => {
    setChatLoading(true);
    setDrawerOpen(false);
    const get_messages = async () => {
      let data = await axios({
        method: "POST",
        url: "api/messages/get_messages",
        data: {
          chat_id: chats[selectedChat].id,
        },
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err.response;
        });
      if (data.status === 200) {
        if (data.data.history.length > 0) {
          setHistory(data.data.history[0].chat_history);
          setChatLoading(false);
        } else {
          setHistory([]);
          setChatLoading(false);
        }
      }
    };
    if (status === "authenticated" && session.user) {
      get_messages();
    }
  }, [selectedChat]);

  if (status === "authenticated") {
    check_user(session.user.email);
  } else if (status === "unauthenticated") {
    router.push("/login");
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  } else if (status === "loading") {
    return (
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const sendMessage = async () => {
    setHistory([...history, { message: message, is_sent: true }]);
    setMessage("");
    setThinking(true);
    let user = null;
    if (session && session.user) {
      user = session.user;
    }
    let data = await axios({
      method: "POST",
      url: "api/messages/send_message",
      data: {
        chat_id: chats[selectedChat].id,
        email: user ? user.email : "",
        message: message,
        history: history,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    if (data.status === 200) {
      if (chats[selectedChat].id === 0) {
        let old_chats = chats;
        old_chats.shift();
        setChats([
          { id: 0, title: "New Chat" },
          { id: data.data.chat[0].id, title: data.data.chat[0].title },
          ...old_chats,
        ]);
        setSelectedChat(1);
        setThinking(false);
      } else {
        setHistory(data.data.chat[0].chat_history);
        setThinking(false);
      }
    }
  };

  const toggleOpenMenu = () => {
    setDrawerOpen(!drawerOpen);
  };

  const clear_chat = async () => {
    let user = null;
    if (session && session.user) {
      user = session.user;
    }
    let data = await axios({
      method: "POST",
      url: "api/messages/clear_chat",
      data: {
        email: user ? user.email : "",
      },
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err.response;
      });
    if (data.status === 200) {
      setHistory([]);
      setChats([{ id: 0, title: "New Chat" }]);
      setSelectedChat(0);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SwipeableDrawer
        PaperProps={{
          sx: {
            width: "80%",
            padding: "20px",
          },
        }}
        anchor="left"
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={toggleOpenMenu}
      >
        <Chats
          active={selectedChat}
          onClick={(id: number) => setSelectedChat(id)}
          chats={chats}
        />
      </SwipeableDrawer>
      <Grid
        container
        spacing={0}
        sx={{
          maxWidth: "1284px",
          height: "100%",
        }}
      >
        <Grid item md={3} display={{ xs: "none", md: "block", height: "100%" }}>
          <Chats
            active={selectedChat}
            onClick={(id: number) => setSelectedChat(id)}
            chats={chats}
            clearChats={clear_chat}
          />
        </Grid>
        <Grid item xs={12} md={9} sx={{ height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: "background.paper",
            }}
          >
            <Box
              sx={{
                width: "100%",
                backgroundColor: "background.default",
                padding: "16px 24px",
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <Box display={{ xs: "block", md: "none" }}>
                <IconButton
                  onClick={() => {
                    toggleOpenMenu();
                  }}
                >
                  <Menu color="primary" />
                </IconButton>
              </Box>
              <Typography
                sx={{ color: "font.main", wordWrap: "break-word" }}
                variant="h6"
              >
                {chats[selectedChat] ? chats[selectedChat].title : ""}
              </Typography>
            </Box>
            <ChatHistory
              loading={chatLoading}
              thinking={thinking}
              chat={history}
              user={user}
              active={selectedChat}
            />
            <Grid container spacing={1} sx={{ padding: "16px 24px" }}>
              <Grid item xs={11}>
                <TextField
                  disabled={thinking}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  sx={{ margin: "16px 0px" }}
                  fullWidth
                  label="Type a message"
                  color="primary"
                  variant="standard"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  disabled={thinking}
                  onClick={() => {
                    sendMessage();
                  }}
                >
                  <Send color="primary" />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
