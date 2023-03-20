import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";

export default function Login(props: any) {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.push("/");
  }
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <Typography variant="h4">Athena</Typography>
      <Button
        variant="contained"
        onClick={() =>
          signIn("google", { callbackUrl: "https://athenachat.app/" })
        }
      >
        Sign in with Google
      </Button>
    </Box>
  );
}
