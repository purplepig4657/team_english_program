import React, {useEffect, useState} from "react";
import Scaffold from "../../components/Scaffold";
import {Fab, Grid, Paper, Typography} from "@mui/material";
import Student from "../../model/Student";
import {useLocation} from "react-router";
import FlexContainer from "../../components/FlexContainer";
import Box from "@mui/material/Box";
import WeekId from "../../model/identifier/WeekId";
import {studentIssueService, studentWeekIssueService} from "../../service/provider/ServiceProvider";
import StudentId from "../../model/identifier/StudentId";
import StudentWeekIssue from "../../model/StudentWeekIssue";
import ClassId from "../../model/identifier/ClassId";
import IssueChart from "./component/IssueChart";
import {ResponsiveContainer} from "recharts";
import StudentIssue from "../../model/StudentIssue";
import AddIcon from "@material-ui/icons/Add";
import MinusIcon from "@material-ui/icons/Remove";
import StudentIssueId from "../../model/identifier/StudentIssueId";


interface StudentInfoProps {
    drawerWidth: number;
}

interface DataInterface {
    name: string,
    issueScore: number
}

interface IssueDataInterface {
    calculated: Array<DataInterface>;
    lateness: Array<DataInterface>;
    absense: Array<DataInterface>;
    attitude: Array<DataInterface>;
    scoreIssue: Array<DataInterface>;
}

const SCREEN_SIZE_MARGIN = 60;


const StudentInfo: React.FC<StudentInfoProps> = ({
     drawerWidth
}) => {
    const [screenWidthNumeric, setScreenWidthNumeric] = useState(window.innerWidth);
    const [data, setData] = React.useState<IssueDataInterface>({
        calculated: [],
        lateness: [],
        absense: [],
        attitude: [],
        scoreIssue: []
    });
    const [thisWeekIssue, setThisWeekIssue] = React.useState<StudentWeekIssue | null>(null);
    const [studentIssue, setStudentIssue] = React.useState<StudentIssue | null>(null);
    const [consultationCount, setConsultationCount] = React.useState<number>(0);
    const [calculatedIssue, setCalculatedIssue] = React.useState<number>(0);

    const location = useLocation();
    const studentObject = location.state.student;
    const classIdList: Array<ClassId> = studentObject._classIdList.map(
        (classId: { _id: any }) => new ClassId(classId._id)
    );
    const student: Student = new Student(
        new StudentId(studentObject._id._id),
        classIdList,
        studentObject._name,
        studentObject._createdAt,
        studentObject._updatedAt,
    );

    useEffect(() => {
        (async () => {
            const data: IssueDataInterface = {
                calculated: [],
                lateness: [],
                absense: [],
                attitude: [],
                scoreIssue: []
            };

            let thisWeekIssueTmp: StudentWeekIssue | null = null;
            let weekId: WeekId = WeekId.thisWeek();
            for (let i = 0; i < 5; i++) {
                const weekIssue: StudentWeekIssue | null =
                    await studentWeekIssueService.getStudentWeekIssueByWeekId(student.id, weekId);
                if (thisWeekIssueTmp === null) thisWeekIssueTmp = weekIssue;
                if (weekIssue === null) {
                    data.calculated.push({ name: 'None', issueScore: 0 });
                    data.lateness.push({ name: 'None', issueScore: 0 });
                    data.absense.push({ name: 'None', issueScore: 0 });
                    data.attitude.push({ name: 'None', issueScore: 0 });
                    data.scoreIssue.push({ name: 'None', issueScore: 0 });
                } else {
                    data.calculated.push({ name: weekIssue.weekId.id, issueScore: weekIssue.getIssueScore() });
                    data.lateness.push({ name: weekIssue.weekId.id, issueScore: weekIssue.lateness });
                    data.absense.push({ name: weekIssue.weekId.id, issueScore: weekIssue.absence });
                    data.attitude.push({ name: weekIssue.weekId.id, issueScore: weekIssue.attitude });
                    data.scoreIssue.push({ name: weekIssue.weekId.id, issueScore: weekIssue.scoreIssue });
                }
                weekId = weekId.lastWeekFromSelf();
            }
            data.calculated.reverse();
            data.lateness.reverse();
            data.absense.reverse();
            data.attitude.reverse();
            data.scoreIssue.reverse();

            const studentIssue: StudentIssue | null = await studentIssueService.getStudentIssueByStudentId(student.id);

            if (studentIssue !== null) {
                setConsultationCount(studentIssue.consultation);
                setCalculatedIssue(studentIssue.getIssueScore());
            }

            setData(data);
            setThisWeekIssue(thisWeekIssueTmp);
            setStudentIssue(studentIssue);
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

    const consultationClick = async (mode: 'plus' | 'minus') => {
        if (studentIssue === null) return;
        if (mode === 'plus') studentIssue.incrementConsultation();
        else studentIssue.decrementConsultation();
        const isSuccess = await studentIssueService.updateStudentIssue(studentIssue);
        if (isSuccess) {
            setConsultationCount(studentIssue.consultation);
            setCalculatedIssue(studentIssue.getIssueScore());
        }
    };

    return <Scaffold>
        <FlexContainer alignItems={'center'}>
            <Typography
                sx={{
                    m: "20px",
                    mr: "8px",
                    fontSize: { xs: '30px', sm: "35px" }
                }}
            >
                {student.name}
            </Typography>
            <Typography
                sx={{
                    m: "20px 0",
                    fontSize: { xs: '20px', sm: "25px" }
                }}
            >
                {" / " + student.getClassIdListString()}
            </Typography>
        </FlexContainer>
        <Typography
            sx={{
                m: "0 20px",
                fontSize: { xs: '20px', sm: "25px" }
            }}
        >
            {WeekId.thisWeek().id}
        </Typography>
        <FlexContainer flexDirection='column' {...{ padding: "20px" }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Paper sx={{ padding: "10px", minHeight: "120px" }}>
                            <Typography sx={{fontSize: { xs: '15px', sm: "12px", md: "20px" }}}>
                                Lateness
                            </Typography>
                            <Typography sx={{fontSize: { xs: '40px', sm: "50px", md: "60px" }, fontWeight: 'bold'}}>
                                {thisWeekIssue === null ? 0 : thisWeekIssue.lateness}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper sx={{ padding: "10px", minHeight: "120px" }}>
                            <Typography sx={{fontSize: { xs: '15px', sm: "12px", md: "20px" }}}>
                                Absense
                            </Typography>
                            <Typography sx={{fontSize: { xs: '40px', sm: "50px", md: "60px" }, fontWeight: 'bold'}}>
                                {thisWeekIssue === null ? 0 : thisWeekIssue.absence}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper sx={{ padding: "10px", minHeight: "120px" }}>
                            <Typography sx={{fontSize: { xs: '15px', sm: "12px", md: "20px" }}}>
                                Attitude
                            </Typography>
                            <Typography sx={{fontSize: { xs: '40px', sm: "50px", md: "60px" }, fontWeight: 'bold'}}>
                                {thisWeekIssue === null ? 0 : thisWeekIssue.attitude}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper sx={{ padding: "10px", minHeight: "120px" }}>
                            <Typography sx={{fontSize: { xs: '15px', sm: "12px", md: "20px" }}}>
                                ScoreIssue
                            </Typography>
                            <Typography sx={{fontSize: { xs: '40px', sm: "50px", md: "60px" }, fontWeight: 'bold'}}>
                                {thisWeekIssue === null ? 0 : thisWeekIssue.scoreIssue}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            <IssueChart data={data.calculated} width={screenWidthNumeric - SCREEN_SIZE_MARGIN}
                        stroke="#FF6666" name="Calculated Issue" />

            <FlexContainer flexWrap='wrap'>
                <Box sx={{
                    width: {
                        xs: (screenWidthNumeric - SCREEN_SIZE_MARGIN),
                        md: (screenWidthNumeric - SCREEN_SIZE_MARGIN) / 2
                    }
                }}>
                    <ResponsiveContainer width='100%'>
                        <IssueChart data={data.lateness} stroke="#004E72" name="lateness" />
                    </ResponsiveContainer>
                </Box>
                <Box sx={{
                    width: {
                        xs: (screenWidthNumeric - SCREEN_SIZE_MARGIN),
                        md: (screenWidthNumeric - SCREEN_SIZE_MARGIN) / 2
                    }
                }}>
                    <ResponsiveContainer width='100%'>
                        <IssueChart data={data.absense} stroke="#F96F2E" name="absense" />
                    </ResponsiveContainer>
                </Box>
                <Box sx={{
                    width: {
                        xs: (screenWidthNumeric - SCREEN_SIZE_MARGIN),
                        md: (screenWidthNumeric - SCREEN_SIZE_MARGIN) / 2
                    }
                }}>
                    <ResponsiveContainer width='100%'>
                        <IssueChart data={data.attitude} stroke="#7F65C5" name="attitude" />
                    </ResponsiveContainer>
                </Box>
                <Box sx={{
                    width: {
                        xs: (screenWidthNumeric - SCREEN_SIZE_MARGIN),
                        md: (screenWidthNumeric - SCREEN_SIZE_MARGIN) / 2
                    }
                }}>
                    <ResponsiveContainer width='100%'>
                        <IssueChart data={data.scoreIssue} stroke="#00B574" name="scoreIssue" />
                    </ResponsiveContainer>
                </Box>
            </FlexContainer>
            <Paper sx={{ margin: "30px", padding: "20px", minHeight: "200px" }}>
                <FlexContainer>
                    <FlexContainer flexDirection="column">
                        <Typography sx={{fontSize: { xs: '15px', sm: "12px", md: "20px" }}}>
                            Consultation Count
                        </Typography>
                        <Typography sx={{fontSize: { xs: '40px', sm: "50px", md: "60px" }, fontWeight: 'bold'}}>
                            {consultationCount}
                        </Typography>
                        <Typography sx={{fontSize: { xs: '15px', sm: "12px", md: "20px" }}}>
                            Calculated with Consultation
                        </Typography>
                        <Typography sx={{fontSize: { xs: '40px', sm: "50px", md: "60px" }, fontWeight: 'bold'}}>
                            {calculatedIssue}
                        </Typography>
                    </FlexContainer>
                    <Fab color="primary" sx={{mr: 2}} onClick={() => consultationClick('plus')}>
                        <AddIcon />
                    </Fab>
                    <Fab color="primary" onClick={() => consultationClick('minus')}>
                        <MinusIcon />
                    </Fab>
                </FlexContainer>
            </Paper>
        </FlexContainer>
    </Scaffold>;
};

export default StudentInfo;
