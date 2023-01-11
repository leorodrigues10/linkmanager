import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
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
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Register() {
  const { register, message } = useAuth();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      register(form);
      toast.success("Registro efectuado com sucesso, faça  o login");
    } catch (e) {
      console.log(e.response);
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
            <h2>Registe-se</h2>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Utilizador"
                variant="filled"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Email"
                variant="filled"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Senha"
                variant="filled"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Confirmar senha"
                variant="filled"
                name="password2"
                value={form.password2}
                onChange={handleChange}
              />
              <Button type="submit">Registar</Button>
            </Stack>
            <Typography sx={{ m: 1 }}>
              Tem uma conta? <Link to="/auth/login">Login</Link>
            </Typography>
          </form>
        </Item>
      </Grid>
    </Grid>
  );
}

export default Register;
