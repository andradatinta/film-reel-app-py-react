import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebaseConfig";
import {
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import TheatersIcon from "@mui/icons-material/Theaters";
import LoginIcon from "@mui/icons-material/Login";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Login error:", error);
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email address.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        default:
          setError("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-app-gray min-h-screen text-[#f8f9fa] flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="flex gap-2 items-center mb-8">
        <TheatersIcon style={{ fontSize: "56px" }} />
        <Typography variant="h1">Film Reel</Typography>
      </div>

      {/* Login Form */}
      <Paper
        elevation={3}
        className="bg-[#495057] p-8 rounded-lg w-full max-w-md"
      >
        <Typography variant="h2" className="text-center mb-6 text-[#495057]">
          Log In
        </Typography>

        {error && (
          <Alert severity="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                margin="dense"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
            sx={{
              mt: 2,
              backgroundColor: "#212529",
              "&:hover": {
                backgroundColor: "#343a40",
              },
              color: "#ffffff",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <Box className="text-center mt-6">
          <Typography variant="body1" className="text-[#495057]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#212529] hover:text-[#495057] underline font-semibold"
            >
              Sign up here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default LoginPage;
