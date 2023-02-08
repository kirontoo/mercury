import "../styles/globals.css";
import { Layout } from "../components";
import { StateProvider } from "../context/StateContext";
import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <StateProvider>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateProvider>
    </ThemeProvider>
  );
}

export default MyApp;
