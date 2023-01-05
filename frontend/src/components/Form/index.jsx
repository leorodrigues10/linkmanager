import { LoadingButton } from "@mui/lab";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

function Form() {
  return (
    <Box sx={{ p: 2 }}>
      <form>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Enter your link here
        </Typography>
        <Stack spacing={2}>
          <TextField fullWidth label="Title" variant="filled" />
          <TextField fullWidth label="Url" variant="filled" />
          <LoadingButton variant="contained">Save</LoadingButton>
        </Stack>
      </form>
        <Divider  sx={{my: 5}}>or use</Divider>
      <form>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Web crawler
        </Typography>
        <Stack spacing={2}>
          <TextField fullWidth label="Page url" variant="filled" />
          <LoadingButton variant="contained">Save</LoadingButton>
        </Stack>
      </form>
    </Box>
  );
}

export default Form;
