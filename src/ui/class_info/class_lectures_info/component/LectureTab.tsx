import React, {useEffect, useState} from "react";
import Lecture from "../../../../model/Lecture";
import StudentLectureIssue from "../../../../model/StudentLectureIssue";
import {studentLectureIssueService, studentService} from "../../../../service/provider/ServiceProvider";
import ClassId from "../../../../model/identifier/ClassId";
import FlexContainer from "../../../../components/FlexContainer";
import Student from "../../../../model/Student";
import {Avatar, Box, Fab, List, ListItem, ListItemAvatar, TextField, Tooltip, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TimeIcon from "@material-ui/icons/AccessTime";
import CalendarIcon from "@material-ui/icons/CalendarToday";
import AttitudeIcon from "@material-ui/icons/DirectionsRun";
import DescendingIcon from "@material-ui/icons/TrendingDown";
import PersonIcon from "@material-ui/icons/Person";
import ListItemText from "@mui/material/ListItemText";
import StudentId from "../../../../model/identifier/StudentId";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import LectureId from "../../../../model/identifier/LectureId";


interface LectureTabProps {
    classId: ClassId;
    lecture: Lecture;
    index: number;
    value: number;
    removeLectureCallback: (targetLectureId: LectureId) => void;
}

interface LectureIssueDict {
    [key: string]: {
        lateness: boolean;
        absence: boolean;
        attitude: boolean;
        scoreIssue: boolean;
    };
}

interface LectureIssueCommentDict {
    [key: string]: {
        lateness: string | null;
        absence: string | null;
        attitude: string | null;
        scoreIssue: string | null;
        good: string | null;
    };
}


const LectureTab: React.FC<LectureTabProps> = ({
    classId,
    lecture,
    index,
    value,
    removeLectureCallback
}) => {
    const [lectureIssueAndStudentList, setLectureIssueAndStudentList] =
        useState<Array<[StudentLectureIssue, Student]>>([]);
    const [lectureIssueDict, setLectureIssueDict] = useState<LectureIssueDict>({});
    const [lectureIssueCommentDict, setLectureIssueCommentDict] = useState<LectureIssueCommentDict>({});

    useEffect(() => {
        value === index && (async () => {  // tab이 눌렸을 때
            if (lectureIssueAndStudentList.length === 0) {  // 한 번 로딩함
                const lectureIssueList: Array<StudentLectureIssue> =
                    await studentLectureIssueService.getAllStudentLectureIssueByLectureId(classId, lecture.id);
                const studentIdList: Array<StudentId> = lectureIssueList.map(
                    (lectureIssue: StudentLectureIssue) => lectureIssue.studentId
                );
                const studentList: Array<Student> = await studentService.getAllStudentByIdListWithCache(studentIdList);
                const lectureIssueAndStudentList: Array<[StudentLectureIssue, Student]> = [];
                for (let lectureIssue of lectureIssueList) {
                    const foundStudent = studentList.find(
                        (student: Student) => student.idString === lectureIssue.studentId.id
                    );
                    if (foundStudent === undefined) continue;
                    lectureIssueAndStudentList.push([lectureIssue, foundStudent]);
                }
                for (let [lectureIssue, student] of lectureIssueAndStudentList) {
                    lectureIssueDict[student.idString] = {
                        lateness: lectureIssue.lateness,
                        absence: lectureIssue.absence,
                        attitude: lectureIssue.attitude,
                        scoreIssue: lectureIssue.scoreIssue,
                    };
                    lectureIssueCommentDict[student.idString] = {
                        lateness: lectureIssue.latenessComment,
                        absence: lectureIssue.absenceComment,
                        attitude: lectureIssue.attitudeComment,
                        scoreIssue: lectureIssue.scoreIssueComment,
                        good: lectureIssue.goodComment,
                    };
                }
                setLectureIssueDict(lectureIssueDict);
                setLectureIssueCommentDict(lectureIssueCommentDict);
                setLectureIssueAndStudentList(lectureIssueAndStudentList);
            }
        })();
    }, [value]);

    const issueButtonClick = async (
        targetLectureIssue: StudentLectureIssue,
        targetIssue: 'lateness' | 'absence' | 'attitude' | 'scoreIssue'
    ) => {
        const isSuccess = await studentLectureIssueService.switchIndicator(
            classId,
            lecture,
            targetLectureIssue,
            targetIssue
        );
        if (isSuccess) {
            const studentLectureIssue = lectureIssueDict[targetLectureIssue.studentId.id];
            studentLectureIssue[targetIssue] = !studentLectureIssue[targetIssue];
            setLectureIssueDict(prev => ({
                ...prev, [targetLectureIssue.studentId.id]: {
                    lateness: studentLectureIssue.lateness,
                    absence: studentLectureIssue.absence,
                    attitude: studentLectureIssue.attitude,
                    scoreIssue: studentLectureIssue.scoreIssue,
                }
            }));
        }
    }

    const handleCommentChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        studentIdString: string,
        targetIssue: 'lateness' | 'absence' | 'attitude' | 'scoreIssue' | 'good'
    ) => {
        switch (targetIssue) {
            case "lateness":
                setLectureIssueCommentDict(prev => ({
                    ...prev, [studentIdString]: {
                        ...prev[studentIdString],
                        lateness: event.target.value,
                    }
                }));
                break;
            case "absence":
                setLectureIssueCommentDict(prev => ({
                    ...prev, [studentIdString]: {
                        ...prev[studentIdString],
                        absence: event.target.value,
                    }
                }));
                break;
            case "attitude":
                setLectureIssueCommentDict(prev => ({
                    ...prev, [studentIdString]: {
                        ...prev[studentIdString],
                        attitude: event.target.value,
                    }
                }));
                break;
            case "scoreIssue":
                setLectureIssueCommentDict(prev => ({
                    ...prev, [studentIdString]: {
                        ...prev[studentIdString],
                        scoreIssue: event.target.value,
                    }
                }));
                break;
            case "good":
                setLectureIssueCommentDict(prev => ({
                    ...prev, [studentIdString]: {
                        ...prev[studentIdString],
                        good: event.target.value,
                    }
                }));
        }
    };

    const saveCommentChanges = async () => {
        for (let [lectureIssue, student] of lectureIssueAndStudentList) {
            let isChanged = false;
            if (lectureIssue.latenessComment !== lectureIssueCommentDict[student.idString].lateness) {
                lectureIssue.setLatenessComment(lectureIssueCommentDict[student.idString].lateness);
                isChanged = true;
            }
            if (lectureIssue.absenceComment !== lectureIssueCommentDict[student.idString].absence) {
                lectureIssue.setAbsenceComment(lectureIssueCommentDict[student.idString].absence);
                isChanged = true;
            }
            if (lectureIssue.attitudeComment !== lectureIssueCommentDict[student.idString].attitude) {
                lectureIssue.setAttitudeComment(lectureIssueCommentDict[student.idString].attitude);
                isChanged = true;
            }
            if (lectureIssue.scoreIssueComment !== lectureIssueCommentDict[student.idString].scoreIssue) {
                lectureIssue.setScoreIssueComment(lectureIssueCommentDict[student.idString].scoreIssue);
                isChanged = true;
            }
            if (lectureIssue.goodComment !== lectureIssueCommentDict[student.idString].good) {
                lectureIssue.setGoodComment(lectureIssueCommentDict[student.idString].good);
                isChanged = true;
            }
            if (isChanged) await studentLectureIssueService.updateStudentLectureIssue(classId, lectureIssue);
        }
    };

    const deleteLectureClick = () => {
        removeLectureCallback(lecture.id);
    }

    return <div
        role="tabpanel"
        hidden={value !== index}
    >
        {value === index && <>
            <FlexContainer flexWrap="wrap">
                <List
                    sx={{
                        width: "100%",
                        maxWidth: 400,
                        p: "0px",
                        m: "20px",
                    }}
                >
                    <Typography
                        sx={{
                            m: "15px",
                            fontSize: { xs: '15px', sm: "20px" }
                        }}
                    >
                        {`${lecture.name} / ${lecture.teacherName}`}
                    </Typography>
                    {lectureIssueAndStudentList
                        .map(([lectureIssue, student]) => {
                            return (
                                <ListItem
                                    key={lectureIssue.idString}
                                    sx={{
                                        border: "1px #ccc solid",
                                        borderRadius: "10px",
                                        mb: "10px"
                                    }}
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
                                    <Tooltip title="lateness">
                                        <IconButton
                                            edge="end"
                                            color={lectureIssueDict[student.idString].lateness ? "error" : "default"}
                                            onClick={async () => await issueButtonClick(lectureIssue, 'lateness')}
                                        >
                                            <TimeIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="absence">
                                        <IconButton
                                            edge="end"
                                            color={lectureIssueDict[student.idString].absence ? "error" : "default"}
                                            onClick={async () => await issueButtonClick(lectureIssue, 'absence')}
                                        >
                                            <CalendarIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="attitude">
                                        <IconButton
                                            edge="end"
                                            color={lectureIssueDict[student.idString].attitude ? "error" : "default"}
                                            onClick={async () => await issueButtonClick(lectureIssue, 'attitude')}
                                        >
                                            <AttitudeIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="scoreIssue">
                                        <IconButton
                                            edge="end"
                                            color={lectureIssueDict[student.idString].scoreIssue ? "error" : "default"}
                                            onClick={async () => await issueButtonClick(lectureIssue, 'scoreIssue')}
                                        >
                                            <DescendingIcon />
                                        </IconButton>
                                    </Tooltip>
                                </ListItem>
                            )
                        }
                    )}
                </List>
                <FlexContainer width="100%" flexDirection="column" {...{maxWidth: "500px", marginRight: "40px"}}>
                    {lectureIssueAndStudentList
                        .map(([lectureIssue, student]) => {
                            return (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "100%",
                                        p: "0px",
                                        m: "20px",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            m: "15px",
                                            fontSize: { xs: '15px', sm: "20px" }
                                        }}
                                    >
                                        {`${student.name} - IssueComment`}
                                    </Typography>
                                    <TextField
                                        label="good point"
                                        defaultValue={lectureIssueCommentDict[student.idString].good}
                                        onChange={(event) => handleCommentChange(event, student.idString, 'good')}
                                        sx={{ width: "100%", mb: "10px" }}
                                        multiline
                                    />
                                    {lectureIssueDict[student.idString].lateness && <TextField
                                        label="lateness"
                                        defaultValue={lectureIssueCommentDict[student.idString].lateness}
                                        onChange={(event) => handleCommentChange(event, student.idString, 'lateness')}
                                        sx={{ width: "100%", mb: "10px" }}
                                        multiline
                                    />}
                                    {lectureIssueDict[student.idString].absence && <TextField
                                        label="absence"
                                        defaultValue={lectureIssueCommentDict[student.idString].absence}
                                        onChange={(event) => handleCommentChange(event, student.idString, 'absence')}
                                        sx={{ width: "100%", mb: "10px" }}
                                        multiline
                                    />}
                                    {lectureIssueDict[student.idString].attitude && <TextField
                                        label="attitude"
                                        defaultValue={lectureIssueCommentDict[student.idString].attitude}
                                        onChange={(event) => handleCommentChange(event, student.idString, 'attitude')}
                                        sx={{ width: "100%", mb: "10px" }}
                                        multiline
                                    />}
                                    {lectureIssueDict[student.idString].scoreIssue && <TextField
                                        label="scoreIssue"
                                        defaultValue={lectureIssueCommentDict[student.idString].scoreIssue}
                                        onChange={(event) => handleCommentChange(event, student.idString, 'scoreIssue')}
                                        sx={{ width: "100%", mb: "10px" }}
                                        multiline
                                    />}
                                </Box>
                            );
                        })
                    }
                    <FlexContainer justifyContent="flex-end">
                        <Fab variant="extended" color="primary" onClick={saveCommentChanges}>
                            <SaveIcon />
                            Save
                        </Fab>
                    </FlexContainer>
                </FlexContainer>
                <FlexContainer width="100%" justifyContent="flex-end" {...{margin: "20px"}}>
                <Fab variant="extended" color="error" sx={{ mt: 1 }} onClick={deleteLectureClick}>
                    <DeleteIcon />
                    Delete
                </Fab>
                </FlexContainer>
            </FlexContainer>
        </>}
    </div>;
}

export default LectureTab;
