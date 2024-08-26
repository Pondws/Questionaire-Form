import Navbar from "@/components/Navbar";
import Form from "@/components/Form";
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

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Form />  
    </ThemeProvider>
  );
}
