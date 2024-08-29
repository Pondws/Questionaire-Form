import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Stack,
  Typography,
  Card,
  FormControl,
  FormLabel,
} from '@mui/material';
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './api/firebase'
import { useRouter } from 'next/navigation';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const router = useRouter()

  const fetchUserData = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/')
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      signInWithEmailAndPassword(auth, user.email, user.password).then((result) => {
        localStorage.setItem("email", user.email)
      }).catch((error) => {
        alert(error.message)
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: '100dvh',
        width: "100wh"
      }}
    >
      <Card
        variant="outlined"
        sx={{
          padding: 5,
          border: 0
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              textAlign: "center"
            }}
          >
            🦊 Foxbith Login
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField
                name="email"
                fullWidth
                id="email"
                placeholder="Email"
                InputProps={{ sx: { borderRadius: 2 } }}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <FormLabel>Password</FormLabel>
              </Box>
              <TextField
                name="password"
                fullWidth
                type="password"
                id="password"
                placeholder="Password"
                InputProps={{ sx: { borderRadius: 2 } }}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              sx={{
                backgroundColor: "#FF5C00",
                color: "#fff",
                border: "none",
                '&:hover': {
                  borderColor: "#FF5C10",
                  color: "#fff",
                  backgroundColor: "#db4d00",
                },
              }}
            >
              Sign in
            </Button>
          </Box>
        </form>
      </Card>
    </Stack>
  )
}

export default Login