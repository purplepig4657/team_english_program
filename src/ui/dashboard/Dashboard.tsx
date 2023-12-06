import React, {useEffect, useState} from "react";
import Scaffold from "../../components/Scaffold";
import {Typography} from "@mui/material";
import FlexContainer from "../../components/FlexContainer";
import Student from "../../model/Student";
import Box from "@mui/material/Box";
import StudentIssue from "../../model/StudentIssue";
import IssuedStudentTable from "./component/IssuedStudentTable";
import {studentIssueService, studentService} from "../../service/provider/ServiceProvider";
import TuitionIssuedStudentTable from "./component/TuitionIssuedStudentTable";


interface DashboardProps {
    drawerWidth: string;
}


const Dashboard: React.FC<DashboardProps> = ({
    drawerWidth
}) => {
    const [issuedStudentList, setIssuedStudentList] = useState<Array<[Student, StudentIssue]>>([]);
    const [tuitionIssuedStudentList, setTuitionIssuedStudentList] = useState<Array<Student>>([]);

    useEffect(() => {
        (async () => {
            const issuedStudentList = await studentIssueService.getAllIssueStudentList();
            const tuitionIssuedStudentList = await studentService.getAllTuitionIssueStudentList();
            setIssuedStudentList(issuedStudentList);
            setTuitionIssuedStudentList(tuitionIssuedStudentList);
        })();
    }, []);

    return <Scaffold>
        <Typography sx={{
                m: "20px",
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            Dashboard
        </Typography>
        <FlexContainer justifyContent="flex-start" flexDirection="column"
                       width={`calc(100vw - ${drawerWidth}px)`}>
            <FlexContainer flexDirection='column' width='100%' {...{ padding: "0 25px" }} >
                <Typography sx={{
                        fontSize: { xs: '15px', sm: "20px" }
                    }}
                >
                    Student issue
                </Typography>
                <IssuedStudentTable studentAndScoreList={issuedStudentList} />
            </FlexContainer>
            <br /><br />
            <FlexContainer flexDirection='column' width='100%' {...{ padding: "0 30px" }} >
                <Typography sx={{
                    fontSize: { xs: '15px', sm: "20px" }
                }}
                >
                    Tuition issue
                </Typography>
                <TuitionIssuedStudentTable studentList={tuitionIssuedStudentList} />
            </FlexContainer>
        </FlexContainer>
    </Scaffold>;
};

export default Dashboard;
