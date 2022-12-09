import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Navbar from "../component/Navbar";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Navbar {...pageProps}/>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
}

export default MyApp;

