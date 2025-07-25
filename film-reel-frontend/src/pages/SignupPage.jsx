import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate("/");
    } catch (error) {
      console.error("Signup error:", error);
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("An account with this email already exists.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/weak-password":
          setError("Password should be at least 6 characters.");
          break;
        case "auth/operation-not-allowed":
          setError("Email/password accounts are not enabled.");
          break;
        default:
          setError("Failed to create account. Please try again.");
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

      {/* Signup Form */}
      <Paper
        elevation={3}
        className="bg-[#495057] p-8 rounded-lg w-full max-w-md"
      >
        <Typography variant="h2" className="text-center mb-4 text-[#f8f9fa]">
          Create Account
        </Typography>

        <Typography variant="body1" className="text-center mb-6 text-[#495057]">
          Join Film Reel today to start building your personal movie collection.
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

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "The passwords do not match",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                margin="dense"
                label="Confirm Password"
                type="password"
                fullWidth
                variant="outlined"
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} /> : <PersonAddIcon />
            }
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
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <Box className="text-center mt-6">
          <Typography variant="body1" className="text-[#495057]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#212529] hover:text-[#495057] underline font-semibold"
            >
              Sign in here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </div>
  );
};

export default SignupPage;
