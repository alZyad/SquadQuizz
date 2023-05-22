// import '@/styles/globals.css'
import type { AppProps } from "next/app";
import styled from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <Component {...pageProps} />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  position:fixed;

  padding:0;
  margin:0;

  top:0;
  left:0;

  width: 100%;
  height: 100%;

  background-color: black;
  color: snow;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;
