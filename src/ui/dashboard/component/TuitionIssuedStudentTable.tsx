import Student from "../../../model/Student";
import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

interface TuitionIssuedStudentTableProps {
    studentList: Array<Student>;
}


const TuitionIssuedStudentTable: React.FC<TuitionIssuedStudentTableProps> = ({
    studentList
}) => {
    return (
        <TableContainer component={Paper} sx={{margin: "10px 0", maxHeight: 300}}>
            <Table stickyHeader sx={{ minWidth: 400 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Classes</TableCell>
                        <TableCell align="right">Tuition Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studentList.map((student) => {
                        return (
                            <TableRow
                                key={student.id.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {`${student.name} (${student.englishName})`}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {student.getClassNameListString()}
                                </TableCell>
                                <TableCell align="right">
                                    {student.tuitionDate.getFullYear() +
                                        "-" + (student.tuitionDate.getMonth() + 1) +
                                        "-" + student.tuitionDate.getDate()}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TuitionIssuedStudentTable;
