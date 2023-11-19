import React, {useEffect} from "react";
import Scaffold from "../../components/Scaffold";
import { Typography } from "@mui/material";
import FlexContainer from "../../components/FlexContainer";
import StudentService from "../../service/StudentService";
import Student from "../../model/Student";
import StudentId from "../../model/identifier/StudentId";
import ClassId from "../../model/identifier/ClassId";

const Dashboard = (): JSX.Element => {
    useEffect(() => {
        (async () => {
            const studentService = StudentService.getInstance();
            // const student = studentService.createStudent(new Student(
            //     new StudentId("none"),
            //     [new ClassId("class1")],
            //     "Hello")
            // );
            studentService.updateStudent(new Student(
                new StudentId("6s2S62Kw4w0cvsVdx5mx"),
                [new ClassId("class1"), new ClassId("class2")],
                "updated"
            ));
            // studentService.addStudentWeekIssue(
            //     new StudentId("6s2S62Kw4w0cvsVdx5mx"),
            //     new StudentWeekIssue(
            //         new StudentWeekIssueId("none"),
            //         new StudentId("6s2S62Kw4w0cvsVdx5mx"),
            //         WeekId.thisWeek(),
            //         0, 0, 0, 0
            //     )
            // );
            // console.log(student);
        })();
    }, []);

    return <Scaffold>
        <Typography 
            sx={{
                m: "20px", 
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            Dashboard
        </Typography>
        <FlexContainer justifyContent="center" flexDirection="row">
            <FlexContainer>
                adfasfdsadf|||||||
            </FlexContainer>
            <FlexContainer> 
                asdfasdfasd
            </FlexContainer>
        </FlexContainer>
    </Scaffold>;
};

export default Dashboard;
