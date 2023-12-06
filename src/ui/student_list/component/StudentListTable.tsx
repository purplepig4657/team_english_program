import React from "react";
import {
    Fab,
    Paper, Table, TableBody,
    TableCell, TableContainer,
    TableHead, TablePagination, TableRow, ToggleButton
} from "@mui/material";
import SearchBar from "material-ui-search-bar";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Student from "../../../model/Student";
import {useNavigate} from "react-router-dom";
import FlexContainer from "../../../components/FlexContainer";
import IconButton from "@mui/material/IconButton";
import {studentService} from "../../../service/provider/ServiceProvider";


interface Column {
    id: 'name' | 'classes' | 'createdAt';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'classes', label: 'Classes', minWidth: 100, align: 'left' },
    { id: 'createdAt', label: 'CreatedAt', minWidth: 110, align: 'right'},
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
    const [editToggle, setEditToggle] = React.useState<boolean>(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const navigate = useNavigate();

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

    const studentInfoClick = (student: Student) => {
        navigate("/student_info", { state: { student: student } })
    }

    const studentCreateClick = () => {
        navigate("/student_update", { state: { student: null } })
    }

    const studentUpdateClick = (targetStudent: Student) => {
        navigate("/student_update", { state: { student: targetStudent } })
    }

    const deleteStudent = async (targetStudent: Student) => {
        const studentList = await studentService.deleteStudentBothStoreAndCache(targetStudent.id);
        setRows(studentList);
    }

    React.useEffect(() => {
        (() => {
            setRows(studentList);
        })();
    }, [studentList]);

    return <>
        <FlexContainer width="100%" justifyContent='space-between'>
            <SearchBar
                value={searched}
                onChange={(searchVal) => requestSearch(searchVal)}
                onCancelSearch={() => cancelSearch()}
                style={{marginBottom: 10}}
            />
            <FlexContainer alignItems="center">
                <ToggleButton
                    value="check"
                    selected={editToggle}
                    onChange={() => {
                        setEditToggle(!editToggle);
                    }}
                    sx={{
                        mr: 2,
                        p: 1
                    }}
                >
                    <EditIcon />
                </ToggleButton>
                <Fab size="small" color="primary" onClick={studentCreateClick}>
                    <AddIcon />
                </Fab>
            </FlexContainer>
        </FlexContainer>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: `calc(100vh - ${300}px)`, minHeight: 300 }}>
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
                            {editToggle &&
                                <TableCell
                                    align="right"
                                    style={{ minWidth: 120 }}
                                >
                                    Edit
                                </TableCell>
                            }
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
                                        sx={{ '&:last-child td, &:last-child th': {border: 0} }}
                                    >
                                        <TableCell
                                            onClick={(event) => studentInfoClick(student)}
                                            component="th"
                                            scope="row"
                                        >
                                            {`${student.name} (${student.englishName})`}
                                        </TableCell>
                                        <TableCell
                                            onClick={(event) => studentInfoClick(student)}
                                            align="left"
                                        >
                                            {student.getClassNameListString()}
                                        </TableCell>
                                        <TableCell
                                            onClick={(event) => studentInfoClick(student)}
                                            align="right"
                                        >
                                            {student.createdAt.getFullYear() +
                                            "-" + (student.createdAt.getMonth() + 1) +
                                            "-" + student.createdAt.getDate()}
                                        </TableCell>
                                        {editToggle &&
                                            <TableCell align="right">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => studentUpdateClick(student)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="warning"
                                                    onClick={() => deleteStudent(student)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        }
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
