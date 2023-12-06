import ClassId from "../../../model/identifier/ClassId";
import WeekId from "../../../model/identifier/WeekId";
import StudentId from "../../../model/identifier/StudentId";
import React, {useEffect, useState} from "react";
import {Divider, List, ListItem, ListItemText, Paper, Typography} from "@mui/material";
import StudentLectureIssue from "../../../model/StudentLectureIssue";
import {classService, lectureService, studentLectureIssueService} from "../../../service/provider/ServiceProvider";
import Lecture from "../../../model/Lecture";


interface ClassLectureCommentsProps {
    studentId: StudentId;
    classId: ClassId;
    weekId: WeekId;
}


const ClassLectureComments: React.FC<ClassLectureCommentsProps> = ({
    studentId,
    classId,
    weekId,
}) => {
    const [className, setClassName] = useState<string>("");
    const [lectureIssues, setLectureIssues] = useState<Array<[Lecture, Array<StudentLectureIssue>]>>([]);

    useEffect(() => {
        (async () => {
            const lectureIssueList: Array<[Lecture, Array<StudentLectureIssue>]> = [];
            const lectureList: Array<Lecture> = await lectureService.getAllLectureListByClassIdAndWeekId(classId, weekId);
            for (let lecture of lectureList) {
                const studentLectureIssueList: Array<StudentLectureIssue> =
                    await studentLectureIssueService.getAllStudentLectureIssueByLectureIdAndStudentId(classId, lecture.id, studentId);
                lectureIssueList.push([lecture, studentLectureIssueList]);
            }
            const className: string | null = await classService.getClassName(classId);
            if (className === null) setClassName("");
            else setClassName(className);
            setLectureIssues(lectureIssueList);
        })();
    }, [weekId]);

    return <Paper sx={{ margin: "30px", padding: "20px"}}>
        <Typography
            sx={{
                m: "20px",
                mr: "8px",
                fontSize: { xs: '20px', sm: "25px" }
            }}
        >
            {className}
        </Typography>
        {lectureIssues
            .map(([lecture, lectureIssue]) => {
                return lectureIssue.length === 1 && <>
                    <Typography
                        sx={{
                            m: "20px",
                            mb: 0,
                            fontSize: { xs: '15px', sm: "20px" }
                        }}
                    >
                        {`${lecture.name} / ${lecture.teacherName}`}
                    </Typography>
                    <List sx={{ width: "90%", bgcolor: "background.paper", ml: "20px" }}>
                        {lectureIssue[0].lateness && <ListItem alignItems="flex-start">
                            <ListItemText
                                primary="lateness"
                                secondary={
                                    <React.Fragment>
                                        {` — ${lectureIssue[0].latenessComment === null ? 
                                            "not commented" : lectureIssue[0].latenessComment}`}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>}
                        {lectureIssue[0].lateness && <Divider component="li" />}
                        {lectureIssue[0].absence && <ListItem alignItems="flex-start">
                            <ListItemText
                                primary="absence"
                                secondary={
                                    <React.Fragment>
                                        {` — ${lectureIssue[0].absenceComment === null ?
                                            "not commented" : lectureIssue[0].absenceComment}`}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>}
                        {lectureIssue[0].absence && <Divider component="li" />}
                        {lectureIssue[0].attitude && <ListItem alignItems="flex-start">
                            <ListItemText
                                primary="attitude"
                                secondary={
                                    <React.Fragment>
                                        {` — ${lectureIssue[0].attitudeComment === null ?
                                            "not commented" : lectureIssue[0].attitudeComment}`}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>}
                        {lectureIssue[0].attitude && <Divider component="li" />}
                        {lectureIssue[0].scoreIssue && <ListItem alignItems="flex-start">
                            <ListItemText
                                primary="scoreIssue"
                                secondary={
                                    <React.Fragment>
                                        {` — ${lectureIssue[0].scoreIssueComment === null ?
                                            "not commented" : lectureIssue[0].scoreIssueComment}`}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>}
                        {lectureIssue[0].scoreIssue && <Divider component="li" />}
                        {lectureIssue[0].goodComment !== null && <ListItem alignItems="flex-start">
                            <ListItemText
                                primary="good"
                                secondary={
                                    <React.Fragment>
                                        {` — ${lectureIssue[0].goodComment}`}
                                    </React.Fragment>
                                }
                            />
                        </ListItem>}
                        {lectureIssue[0].goodComment !== null && <Divider component="li" />}
                    </List>
                </>
            })

        }
    </Paper>;
}

export default ClassLectureComments;
