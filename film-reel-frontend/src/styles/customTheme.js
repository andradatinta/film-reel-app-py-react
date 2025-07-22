import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    color: "#f8f9fa",
    h1: {
      fontSize: "4rem",
      fontWeight: 400,
    },
    h2: {
      fontSize: "1.875rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontSize: "0.875rem",
          fontWeight: "bold",
          color: "#212529",
        },
        containedPrimary: {
          backgroundColor: "#f1f3f5",
          "&:hover": {
            backgroundColor: "#e9ecef",
          },
        },
        containedSizeMedium: {
          width: "150px",
        },
        containedSecondary: {
          backgroundColor: "#ff6b6b",
          "&:hover": {
            backgroundColor: "#cc5656",
          },
        },
        outlined: {
          borderColor: "#f1f3f5",
          color: "#f1f3f5",
        },
        submit: {
          backgroundColor: "#212529",
          "&:hover": {
            backgroundColor: "#343a40",
          },
          color: "#ffffff",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#ffffff",
          },
        },
      },
    },
  },
});

export default customTheme;
