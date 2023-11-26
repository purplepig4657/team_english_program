import React, {useEffect, useState} from "react";
import Scaffold from "../../components/Scaffold";
import { Typography } from "@mui/material";
import FlexContainer from "../../components/FlexContainer";
import Student from "../../model/Student";
import StudentService from "../../service/StudentService";
import StudentListTable from "./component/StudentListTable";

const StudentList = (): JSX.Element => {
    const [studentList, setStudentList] = useState<Array<Student>>([]);

    useEffect(() => {
        (async () => {
            const studentService = StudentService.getInstance();
            const studentList: Array<Student> = await studentService.getAllStudent();
            setStudentList(studentList);
        })();
    }, []);

    return <Scaffold>
        <Typography 
            sx={{
                m: "20px", 
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            StudentList
        </Typography>
        <FlexContainer flexWrap='wrap' {...{padding: "20px"}}>
            <StudentListTable studentList={studentList} />
        </FlexContainer>
    </Scaffold>;
};

export default StudentList;
