import {
  TextField,
  Typography,
  Stack,
  Paper,
  Box,
  Chip,
  FormControlLabel,
  Checkbox,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { InfoRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags, startCrawl } from "../../redux/slice/link";
import { toast } from "react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Crawl() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(0);
  const { tags, isSubmitting } = useSelector((state) => state.link);
  const [scroll, setScroll] = useState(false);
  const [url, setUrl] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(startCrawl({ url, scroll }))
      .unwrap()
      .then(() => {
        toast.success("Links salvados com sucesso!");
      })
      .catch(() => {
        toast.error("Ocorreu um erro!");
      });
  };

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  return (
    <form onSubmit={onSubmit}>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Use o web crawler!
      </Typography>
      <Stack aligItems="flex-start">
        <Typography variant="h7" sx={{ textAlign: "start" }}>
          Escolha uma tag
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ p: 1, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          {!tags.length && <CircularProgress />}
        </Box>

        {tags.map((item) => (
          <span>
            <Chip
              label={item.tag}
              color={selected === item.id ? "secondary" : "primary"}
              size="small"
              sx={{ mb: 1 }}
              variant={selected === item.id ? "contained" : "outlined"}
              onClick={() => {
                setSelected(item.id);
                setUrl(item.url);
              }}
            />
          </span>
        ))}
      </Stack>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <TextField
          size="small"
          style={{ color: "#b5b5b5" }}
          fullWidth
          label="Url"
          variant="filled"
          name="title"
          value={url}
          disabled
          required
          helperText="Esta url é a url do blog/site que desejas extrair os links"
        />
        <Stack direction="row" alignItems="center">
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={scroll}
                onChange={(e) => {
                  setScroll(e.target.checked);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Habilitar Scroll"
          />
          <Tooltip title="Habilitando este checkbox o bot poderá fazer scroll na webpage e pegar mais links">
            <InfoRounded fontSize="small" />
          </Tooltip>
        </Stack>

        <LoadingButton
          disabled={!selected}
          loading={isSubmitting}
          variant="contained"
          type="submit"
          color="secondary"
        >
          Start
        </LoadingButton>
      </Stack>
    </form>
  );
}

export default Crawl;
