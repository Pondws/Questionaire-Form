import React, { useState, useEffect } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button
} from '@mui/material';
import { auth } from '../pages/api/firebase'
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [userDetails, setUserDetails] = useState("")

  const router = useRouter()

  const fetchUserData = () => {
    const email = localStorage.getItem('email')
    if (email) {
      setUserDetails(email);
    }
    
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login')
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  });

  async function handleLogout() {
    try {
      await signOut(auth).then((result) => {
        localStorage.removeItem("email")
        router.push('/login')
      }).catch((error) => {
        console.log("error", error)
      })
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

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
            justifyContent: "space-between"
          }}
        >
          <Typography
            sx={{
              fontSize: 24,
            }}
          >
            🦊 Foxbith Questionnaire
          </Typography>

          <Box
            sx={{
              display: "flex"
            }}
          >

            <Typography
              sx={{
                alignContent: "center"
              }}
            >
              {userDetails}
            </Typography>

            <Button
              sx={{
                backgroundColor: "#FF5C00",
                color: "#fff",
                ml: 1,
                width: 120,
                border: "none",
                '&:hover': {
                  borderColor: "#FF5C10",
                  color: "#fff",
                  backgroundColor: "#db4d00",
                },
              }}
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
