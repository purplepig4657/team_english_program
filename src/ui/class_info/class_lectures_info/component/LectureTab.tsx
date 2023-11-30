import React, {useEffect, useState} from "react";
import Lecture from "../../../../model/Lecture";
import StudentLectureIssue from "../../../../model/StudentLectureIssue";
import {studentLectureIssueService} from "../../../../service/provider/ServiceProvider";
import ClassId from "../../../../model/identifier/ClassId";
import FlexContainer from "../../../../components/FlexContainer";
import Student from "../../../../model/Student";
import {Avatar, List, ListItem, ListItemAvatar, Paper, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PersonIcon from "@material-ui/icons/Person";
import ListItemText from "@mui/material/ListItemText";


interface LectureTabProps {
    classId: ClassId;
    lecture: Lecture;
    index: number;
    value: number;
}


const LectureTab: React.FC<LectureTabProps> = ({
    classId,
    lecture,
    index,
    value
}) => {
    const [lectureIssueList, setLectureIssueList] = useState<Array<StudentLectureIssue>>([]);

    useEffect(() => {
        value === index && (async () => {  // tab이 눌렸을 때
            if (lectureIssueList.length === 0) {  // 한 번 로딩함
                const lectureIssueList: Array<StudentLectureIssue> =
                    await studentLectureIssueService.getAllStudentLectureIssueByLectureId(classId, lecture.id);
                setLectureIssueList(lectureIssueList);
            }
        })();
    }, [value]);

    return <div
        role="tabpanel"
        hidden={value !== index}
    >
        {value === index && (
            <FlexContainer>
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        p: "0px",
                        m: "20px",
                        border: "1px #ccc solid",
                        borderRadius: "10px"
                    }}
                >
                    {lectureIssueList
                        .map((lectureIssue: StudentLectureIssue) => {
                                return (
                                    <ListItem
                                        key={lectureIssue.idString}
                                        secondaryAction={
                                            <IconButton edge="end">
                                                <MoreHorizIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={lectureIssue.idString} secondary={lectureIssue.idString} />
                                    </ListItem>
                                )
                            }
                        )}
                </List>
            </FlexContainer>
        )}
    </div>;
}

export default LectureTab;
