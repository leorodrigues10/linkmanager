import logo from "./logo.svg";
import "./App.css";
import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";
import { useState } from "react";
import Header from "./components/Header";
import GridItem from "./components/GridItem";
import Form from "./components/Form";
import StickyHeadTable from "./components/Table";

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
    <Box sx={{ height: "100vh", background: "#F2f2f2" }}>
      <Header />
      <Box sx={{ height: "93vh" }}>
        <Grid container spacing={2} sx={{ px: 10, py: 5, height: "100%" }}>
          <GridItem>
            <Form />
          </GridItem>
          <GridItem>
            <Box padding={2}>
              <Typography variant="h5">List my links</Typography>
              <StickyHeadTable />
            </Box>
          </GridItem>
          <GridItem>ChatRoom</GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
