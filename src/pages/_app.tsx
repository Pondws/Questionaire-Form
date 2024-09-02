import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Prompt } from 'next/font/google'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const prompt = Prompt({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const theme = createTheme({
  typography: {
    fontFamily: prompt.style.fontFamily
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
