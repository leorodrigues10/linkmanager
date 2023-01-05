import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Stack } from "@mui/system";
import { useState } from "react";
import Header from "./components/Header";
import GridItem from "./components/GridItem";
import Form from "./components/Form";
import StickyHeadTable from "./components/Table";
import { useDispatch } from "react-redux";
import { addLink, getLinks } from "./redux/slice/link";
import { useEffect } from "react";

function App() {
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
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
