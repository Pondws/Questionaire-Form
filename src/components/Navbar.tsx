import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Navbar() {
  return (
    <Box>
      <AppBar position="static"
        sx={{
          color: "#000",
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
          >
            🦊 Foxbith Questionnaire
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
