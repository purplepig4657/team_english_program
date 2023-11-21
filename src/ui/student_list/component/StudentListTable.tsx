import React from "react";
import {
    Paper, Table, TableBody,
    TableCell, TableContainer,
    TableHead, TablePagination, TableRow
} from "@mui/material";
import SearchBar from "material-ui-search-bar";
import Student from "../../../model/Student";


interface Column {
    id: 'name' | 'classes' | 'createdAt';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'classes', label: 'Classes', minWidth: 100, align: 'right' },
    { id: 'createdAt', label: 'CreatedAt', minWidth: 170, align: 'right'},
];


interface StudentListTableProps {
    studentList: Array<Student>;
}


const StudentListTable: React.FC<StudentListTableProps> = ({
    studentList
}) => {
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState<Array<Student>>(studentList);
    const [searched, setSearched] = React.useState<string>("");
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const requestSearch = (searchedVal: string) => {
        const filteredRows = studentList.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };

    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    React.useEffect(() => {
        (() => {
            setRows(studentList);
        })();
    }, [studentList]);

    return <>
        <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            style={{marginBottom: 10}}
        />
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: `calc(100vh - ${250}px)`, minHeight: 300 }}>
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
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((student) => {
                                return (
                                    <TableRow
                                        hover
                                        key={student.id.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {`${student.name}`}
                                        </TableCell>
                                        <TableCell align="right">{student.getClassIdListString()}</TableCell>
                                        <TableCell align="right">{
                                            student.createdAt.getFullYear() +
                                            "-" + (student.createdAt.getMonth() + 1) +
                                            "-" + student.createdAt.getDate()
                                        }</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </>;
}

export default StudentListTable;
