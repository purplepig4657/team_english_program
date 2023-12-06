import React, {useEffect, useState} from "react";
import {Avatar, List, ListItem, ListItemAvatar, Paper, Typography} from "@mui/material";
import PersonIcon from "@material-ui/icons/Person";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ListItemText from "@mui/material/ListItemText";
import Student from "../../../model/Student";
import {useNavigate} from "react-router-dom";
import Class from "../../../model/Class";
import {classService, studentWeekIssueService} from "../../../service/provider/ServiceProvider";
import IconButton from "@mui/material/IconButton";
import WeekId from "../../../model/identifier/WeekId";
import StudentWeekIssue from "../../../model/StudentWeekIssue";
import StudentId from "../../../model/identifier/StudentId";
import AverageIssueChart from "./component/AverageIssueChart";
import {ResponsiveContainer} from "recharts";
import Box from "@mui/material/Box";

interface ClassStudentsInfoProps {
    drawerWidth: number,
    classObject: Class
}

interface AverageIssueScoreInterface {
    name: string;
    averageIssueScore: number
}


const ClassStudentsInfo: React.FC<ClassStudentsInfoProps> = ({
    drawerWidth,
    classObject
}) => {
    const [screenWidthNumeric, setScreenWidthNumeric] = useState<number>(window.innerWidth);
    const [studentList, setStudentList] = useState<Array<Student>>([]);
    const [averageIssueScoreList, setAverageIssueScoreList] = useState<Array<AverageIssueScoreInterface>>([]);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const studentList: Array<Student> = await classService.getAllClassStudent(classObject.id);
            if (studentList.length === 0) return;
            const studentIdList: Array<StudentId> = studentList.map((student: Student) => student.id);
            const averageIssueScoreList: Array<AverageIssueScoreInterface> = [];
            let weekId: WeekId = WeekId.thisWeek();
            const promiseList: Promise<Array<StudentWeekIssue>>[] = [];
            for (let i = 0; i < 5; i++) {
                promiseList.push(studentWeekIssueService.getAllStudentWeekIssueByWeekId(studentIdList, weekId));
                weekId = weekId.lastWeekFromSelf();
            }

            const promiseResolve: Array<Array<StudentWeekIssue>> = await Promise.all(promiseList);
            for (let studentWeekIssueList of promiseResolve) {
                let sumOfIssueScore: number = 0;
                let weekId: WeekId | null = null;
                for (let studentWeekIssue of studentWeekIssueList) {
                    if (weekId === null) weekId = studentWeekIssue.weekId;
                    sumOfIssueScore += studentWeekIssue.getIssueScore();
                }
                const averageIssueScore: number = sumOfIssueScore / studentList.length;
                if (weekId === null) averageIssueScoreList.push({ name: "None", averageIssueScore: averageIssueScore });
                else averageIssueScoreList.push({ name: weekId.id, averageIssueScore: averageIssueScore });
            }

            averageIssueScoreList.sort(
                (a, b) => a.name.localeCompare(b.name)
            );

            setStudentList(studentList);
            setAverageIssueScoreList(averageIssueScoreList);
        })();

        const screenResize = () => {
            const viewportWidth = window.innerWidth;
            const valueInVw = parseFloat("100vw");
            setScreenWidthNumeric((valueInVw / 100) * viewportWidth - drawerWidth);
        }

        screenResize();
        window.addEventListener("resize", screenResize);

        return () => {
            // cleanup
            window.removeEventListener("resize", screenResize);
        };
    }, [drawerWidth]);

    const studentInfoClick = (student: Student) => {
        navigate("/student_info", { state: { student: student } })
    }

    return <>
        <Box
            sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "space-between" },
                padding: "0px 50px",
                flexWrap: 'wrap'
            }}
        >
            <List component={Paper}
                  sx={{
                      width: '100%',
                      maxWidth: 360,
                      p: "10px",
                      mb: { xs: "30px", md: 0 }
                }}
            >
                <Typography
                    sx={{
                        m: "20px",
                        fontSize: { xs: '15px', sm: "20px" }
                    }}
                >
                    Student List
                </Typography>
                {studentList
                    .map((student: Student) => {
                        return (
                            <ListItem
                                key={student.idString}
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => studentInfoClick(student)}>
                                        <MoreHorizIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${student.name} (${student.englishName})`}
                                    secondary={student.getClassNameListString()}
                                />
                            </ListItem>
                        )
                    }
                )}
            </List>
            <Paper
                sx={{
                    width: { xs: screenWidthNumeric - 100, md: screenWidthNumeric - 500 },
                    p: "20px 0"
                }}
            >
                <ResponsiveContainer width='100%'>
                    <AverageIssueChart
                        data={averageIssueScoreList}
                        stroke="#FF6666"
                        name="Average Issue Score"
                    />
                </ResponsiveContainer>
            </Paper>
        </Box>
    </>;
};

export default ClassStudentsInfo;
