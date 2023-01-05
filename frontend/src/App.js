import logo from "./logo.svg";
import "./App.css";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";
import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    title: "",
    url: "",
  });

  const handleFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };


  const onSubmit = async (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/links/", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <Box sx={{ padding: 10 }}>
      <form onSubmit={onSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleFormChange}
          />
          <TextField
            label="Url"
            name="url"
            value={form.url}
            onChange={handleFormChange}
          />
          <LoadingButton variant="contained" type="submit">
            Save
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}

export default App;
