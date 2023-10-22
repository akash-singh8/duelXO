import "@/styles/globals.css";
import Head from "next/head";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>DuelXO</title>
        <meta
          name="description"
          content="The ultimate multiplayer Tic Tac Toe experience where strategy meets real-time competition! Challenge your friends or compete against opponents from around the world in a battle for X and O supremacy."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
