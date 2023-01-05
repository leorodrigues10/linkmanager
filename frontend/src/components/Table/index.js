import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { deleteLinks, getLinks } from "../../redux/slice/link";
import { IconButton, Tooltip } from "@mui/material";
import {
  EditRounded,
  DeleteRounded,
  OpenInNewRounded,
} from "@mui/icons-material";
import { Stack } from "@mui/system";

const columns = [
  { id: "name", label: "Title" },
  { id: "code", label: "Action", maxWidth: 10 },
];

export default function StickyHeadTable() {
  const dispatch = useDispatch();
  const { links } = useSelector((state) => state.link);

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
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
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
                    <TableCell sx={{ width: "80%" }} key={row.id}>
                      {row.title}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row">
                        <Tooltip title="Open in new window">
                          <IconButton>
                            <OpenInNewRounded />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton>
                            <EditRounded sx={{ color: "green" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() =>
                              dispatch(deleteLinks({ id: row.id }))
                            }
                          >
                            <DeleteRounded sx={{ color: "red" }} />
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
    </Paper>
  );
}
