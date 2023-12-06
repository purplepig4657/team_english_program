import Student from "../../../model/Student";
import StudentIssue from "../../../model/StudentIssue";
import React from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface IssuedStudentTableProps {
    studentAndScoreList: Array<[Student, StudentIssue]>;
}


const IssuedStudentTable: React.FC<IssuedStudentTableProps> = ({
   studentAndScoreList
}) => {
    const navigate = useNavigate();

    const studentInfoClick = (student: Student) => {
        navigate("/student_info", { state: { student: student } })
    }

    return (
        <TableContainer component={Paper} sx={{margin: "10px 0", maxHeight: 300}}>
            <Table stickyHeader sx={{ minWidth: 400 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Student Name</TableCell>
                        <TableCell>Classes</TableCell>
                        <TableCell align="right">Issue score</TableCell>
                        <TableCell align="right">consultation count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {studentAndScoreList.map(([student, studentIssue]) => {
                        return (
                            <TableRow
                                hover
                                key={student.id.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                onClick={(event) => studentInfoClick(student)}
                            >
                                <TableCell component="th" scope="row">
                                    {`${student.name} (${student.englishName})`}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {student.getClassNameListString()}
                                </TableCell>
                                <TableCell align="right">{studentIssue.getIssueScore()}</TableCell>
                                <TableCell align="right">{studentIssue.consultation}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default IssuedStudentTable;
