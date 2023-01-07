import * as React from 'react';
import Button from '@mui/material/Button';
import {LoadingButton} from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {deleteLinks} from "../../redux/slice/link";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({open, setOpen, link}) {
    const dispatch = useDispatch()
    const {isDeleting} = useSelector(state => state.link)
    const handleClose = () => {
        setOpen(false);
    };


    const handleDelete = () => {
        dispatch(deleteLinks({id: link.id}))
            .unwrap()
            .then(res => {
                toast.success(res.message)
                handleClose()
            })
            .catch(error => {
                toast.error(error.response.data.message);
                handleClose()
            })
    }

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Apagar este link?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Esta operação apaga este link de forma pemanente.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant='outlined' color='error'>Cancelar</Button>
                <LoadingButton
                    loading={isDeleting}
                    onClick={handleDelete}
                    variant='contained'
                    color='secondary'>
                    Apagar
                </LoadingButton>
            </DialogActions>
        </Dialog>

    );
}