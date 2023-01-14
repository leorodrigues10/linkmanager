import React, { useEffect, useState } from "react";
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
  const [minLengthMessage, setMinLengthMessage] = useState(
    "Mínimo 8 caracteres"
  );
  const [showMinLengthMessage, setShowMinLengthMessage] = useState(false);
  const [passwordMatchMessage, setPasswordMactchMessage] = useState(
    "Passwords não são iguais"
  );
  const [showPasswordMatchMessage, setShowPasswordMactchMessage] =
    useState(false);

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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.password.length < 8 && form.password.length > 0) {
        setShowMinLengthMessage(true);
        return;
      }

      if (form.password !== form.password2) {
        setShowPasswordMactchMessage(true);
        return;
      }
      await register(form);
      toast.success("Registro efectuado com sucesso, faça  o login");
      setForm({
        email: "",
        username: "",
        password: "",
        password2: "",
      });
    } catch (e) {
      toast.error("Utilizador não pode ser registrado");
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
                required
                value={form.username}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                type="email"
                label="Email"
                variant="filled"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                label="Senha"
                variant="filled"
                name="password"
                type="password"
                min={8}
                required
                value={form.password}
                onChange={handleChange}
                error={showMinLengthMessage || showPasswordMatchMessage}
                helperText={showMinLengthMessage ? minLengthMessage : ""}
              />
              <TextField
                fullWidth
                label="Confirmar senha"
                variant="filled"
                name="password2"
                type="password"
                required
                value={form.password2}
                error={showPasswordMatchMessage}
                helperText={
                  showPasswordMatchMessage ? passwordMatchMessage : ""
                }
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
