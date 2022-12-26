import "@fontsource/kodchasan";
import "@fontsource/kodchasan/300.css";
import "@fontsource/kodchasan/400.css";
import "@fontsource/kodchasan/500.css";
import "@fontsource/kodchasan/600.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>chladni</title>
        <meta name="title" content="chladni" />
        <meta name="description" content="chladni" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="min-w-screen min-h-screen bg-zinc-900 text-slate-200 font-main">
        <Component {...pageProps} />
      </div>
    </>
  );
}
