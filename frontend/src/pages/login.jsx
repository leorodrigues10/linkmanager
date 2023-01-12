import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  TextField,
  Grid,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form.username, form.password);
    } catch (err) {
        if(err.response.status === 401) {
            toast.error('Credencias errados')
        }
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100%",
        background: "#f2f2f2",
      }}
    >
      <Grid item xs={10} sm={7} md={4} lg={3}>
        <Item>
          <form onSubmit={onSubmit}>
            <h2>Login</h2>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Username"
                variant="filled"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                type='password'
                label="Password"
                name="password"
                variant="filled"
                value={form.password}
                required
                onChange={handleChange}
              />
              <Button type="submit">Login</Button>
            </Stack>
            <Typography sx={{ m: 1 }}>
              Não tem uma conta? <Link to="/auth/register">Registe</Link>
            </Typography>
          </form>
        </Item>
      </Grid>
    </Grid>
  );
}

export default Login;
