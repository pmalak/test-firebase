import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components/layout";
import { StylesProvider } from "@material-ui/core";
import { ThemeProvider } from "styled-components";
import { baseMuiTheme } from "@/styles/baseMuiTheme";
import { initializeApp } from "firebase/app";
import { FirebaseContextProvider } from "@/components/firebase-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={baseMuiTheme}>
      <StylesProvider injectFirst>
        <FirebaseContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FirebaseContextProvider>
      </StylesProvider>
    </ThemeProvider>
  );
}
