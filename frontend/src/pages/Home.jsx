import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Nav from '../components/nav'
import Footer from '../components/Footer'
import MainFeaturedPost from './MainFeaturedPost';

const mainFeaturedPost = {
  title:'Note Maker App',
  description:
    "Bring ideas to life with Note Maker! Enjoy the powerful, yet wonderfully simple note-taking experience. Note maker is as versatile as you. Jot down thoughts, import & annotate textbooks, sync your notes with audio, or sketch your next masterpiece. Whether you’re a student, professional, or hobbyist—you’ll find all the tools you need.",
  image: 'https://assets-global.website-files.com/620e4101b2ce12a1a6bff0e8/63f3aed338f92709d7908c76_Header_10%20Best%20Note-Taking%20Apps%20Every%20Student%20Needs%20in%202023_JAN23.webp',
  imageText: 'note image description',
  linkText: 'CREATE NOTE',
};



// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Home() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <Nav/>
      <CssBaseline />
      <Container maxWidth="lg">

        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
      </Container>
      <Footer
        title="Note Maker"
        description="Take Life Notes!"
      />
    </ThemeProvider>
  );
}