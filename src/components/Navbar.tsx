import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Prompt } from 'next/font/google'

const prompt = Prompt({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    display: 'swap',
  })

export default function Navbar() {
    return (
        <Box>
            <AppBar position="static"
                sx={{
                    color: "#000",
                    fontSize: 24,
                    boxShadow: "none",
                }}
            >
                <Toolbar
                    sx={{
                        backgroundColor: "#fff",
                        borderBottom: "1px solid #c2c2c2",
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 24,
                        }}
                        className={prompt.className}
                    >
                        🦊 Foxbith Questionnaire
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
