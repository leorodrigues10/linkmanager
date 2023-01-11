import {LoadingButton} from "@mui/lab";
import {Box, Divider, Paper, TextField, Typography, useTheme} from "@mui/material";
import {Stack} from "@mui/system";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addLink, resetLink, updateLink} from "../../redux/slice/link";
import {toast} from "react-toastify";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginRight: 2
}));

function Form() {
    const theme = useTheme()

    const dispatch = useDispatch();
    const {isSubmitting, update, link} = useSelector((state) => state.link);

    const [form, setForm] = useState({
        title: "",
        url: "",
    });

    const handleFormChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setForm((prevState) => ({...prevState, [name]: value}));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (update) {
            dispatch(updateLink({data: form, id: link.id}))
                .unwrap()
                .then((res) => {
                    toast.success(res.message);
                    dispatch(resetLink())
                    setForm({
                        title: "",
                        url: "",
                    });
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        } else {
            dispatch(addLink({data: form}))
                .unwrap()
                .then((res) => {
                    toast.success(res.message);
                    setForm({
                        title: "",
                        url: "",
                    });

                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
        }


    };


    useEffect(() => {
        if (link) {
            setForm({
                title: link.title,
                url: link.url
            })
        } else {
            setForm({
                title: '',
                url: ''
            })
        }
    }, [link]);

    return (
        <form onSubmit={onSubmit}>
            <Typography variant="h5" sx={{mb: 1}}>
                Salva o seu link aqui!
            </Typography>
            <Stack spacing={2}>
                <TextField
                    style={{color: "#b5b5b5"}}
                    fullWidth
                    label="Título"
                    variant="filled"
                    name="title"
                    value={form.title}
                    required
                    onChange={handleFormChange}
                />
                <TextField
                    fullWidth
                    label="Url"
                    variant="filled"
                    name="url"
                    style={{color: "#b5b5b5"}}
                    value={form.url}
                    required
                    onChange={handleFormChange}
                />
                {
                    update && <Button
                        variant="text"
                        type="submit"
                        color="secondary"
                        onClick={() => dispatch(resetLink())}
                    >
                        Cancelar
                    </Button>
                }

                <LoadingButton
                    loading={isSubmitting}
                    variant="contained"
                    type="submit"
                    color="secondary"
                >
                    Salvar
                </LoadingButton>
            </Stack>
        </form>

    );
}

export default Form;
