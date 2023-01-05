import { LoadingButton } from "@mui/lab";
import { Box, Divider, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLink } from "../../redux/slice/link";
import { toast } from "react-toastify";

function Form() {
  const dispatch = useDispatch();
  const { isSubmitting } = useSelector((state) => state.link);

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

    dispatch(addLink({ data: form }))
      .unwrap()
      .then((res) => {
        toast.success("Operation performed sucessfully");
        setForm({
          title: "",
          url: "",
        });
      })
      .catch((err) => {
        toast.error("Operation cannot be performed");
      });
  };

  console.log(isSubmitting);
  return (
    <Box sx={{ p: 2 }}>
      <form onSubmit={onSubmit}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Enter your link here
        </Typography>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Title"
            variant="filled"
            name="title"
            value={form.title}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            label="Url"
            variant="filled"
            name="url"
            value={form.url}
            onChange={handleFormChange}
          />
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            type="submit"
          >
            Save
          </LoadingButton>
        </Stack>
      </form>
      <Divider sx={{ my: 5 }}>or use</Divider>
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
