import React, {useEffect, useState} from "react";
import Scaffold from "../../components/Scaffold";
import {Typography} from "@mui/material";
import FlexContainer from "../../components/FlexContainer";
import Student from "../../model/Student";
import StudentId from "../../model/identifier/StudentId";
import ClassId from "../../model/identifier/ClassId";
import Box from "@mui/material/Box";
import StudentIssue from "../../model/StudentIssue";
import IssuedStudentTable from "./component/IssuedStudentTable";
import {studentIssueService, studentService} from "../../service/provider/ServiceProvider";
import ClassService from "../../service/ClassService";
import Class from "../../model/Class";


interface DashboardProps {
    drawerWidth: string;
}


const Dashboard: React.FC<DashboardProps> = ({
    drawerWidth
}) => {
    const [issuedStudentList, setIssuedStudentList] = useState<Array<[Student, StudentIssue]>>([]);

    useEffect(() => {
        (async () => {
            const _studentService = studentService;
            const _studentIssueService = studentIssueService;
            const issuedStudentList = await studentIssueService.getAllIssueStudentList();
            setIssuedStudentList(issuedStudentList);
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
                <Box sx={{
                    width: '100%',
                    height: 'auto',
                    minHeight: '200px',
                    backgroundColor: 'lightblue',
                    margin: '10px 0'
                }}>
                    {/* Tuition List */}
                </Box>
            </FlexContainer>
        </FlexContainer>
    </Scaffold>;
};

export default Dashboard;
