import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: "#C7486A",
      hover: "rgba(199, 72, 106, 0.3)",
    },
    secondary: {
      main: "#C16B9B",
    },
    athena: "#09092c",
    font: {
      main: "#F4F4F0",
    },
    background: {
      default: "#27283C",
      paper: "#13131e",
    },
    divider: "#F4F4F0",
    text: {
      primary: "#C16B9B",
      secondary: "#F4F4F0",
    },
  },
  spacing: 10,
});

theme.spacing(2);

theme = responsiveFontSizes(theme);

export default theme;
