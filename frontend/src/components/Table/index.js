import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {useDispatch, useSelector} from "react-redux";
import {deleteLinks, getLink, getLinks, resetLink} from "../../redux/slice/link";
import {IconButton, Tooltip, Typography} from "@mui/material";
import {
    EditRounded,
    DeleteRounded,
    OpenInNewRounded,
} from "@mui/icons-material";
import {Stack} from "@mui/system";
import AlertDialogSlide from "../Dialog";
import {useState} from "react";

const columns = [
    {id: "name", label: "Title"},
    {id: "code", label: "Action", maxWidth: 10},
];

export default function StickyHeadTable() {
    const dispatch = useDispatch();
    const {links} = useSelector((state) => state.link);

    const [link, setLink] = useState(null)
    const [open, setOpen] = useState(false)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        dispatch(getLinks())
            .unwrap()
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }, [dispatch]);

    return (
        <Paper sx={{width: "100%", overflow: "hidden"}}>
            <TableContainer sx={{maxHeight: 400}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {links
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <TableCell sx={{width: "80%"}} key={row.id}>
                                            <Typography style={{color: "#4d4d4d"}}>
                                                {row.title}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row">
                                                <Tooltip title="Open in new window">
                                                    <IconButton onClick={() => {
                                                        window.open(row.url, '_blank')

                                                    }}>
                                                        <OpenInNewRounded/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Edit">
                                                    <IconButton onClick={() => {
                                                        dispatch(getLink(row))
                                                    }}>
                                                        <EditRounded sx={{color: "green"}}/>
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton
                                                        onClick={() => {
                                                            setLink(row)
                                                            setOpen(true)
                                                            dispatch(resetLink())
                                                        }
                                                        }
                                                    >
                                                        <DeleteRounded sx={{color: "red"}}/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={links.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <AlertDialogSlide open={open} setOpen={setOpen} link={link}/>
        </Paper>
    );
}
