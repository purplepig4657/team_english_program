import React, {useState} from "react";
import {Fab, TextField, Typography} from "@mui/material";
import Scaffold from "../../components/Scaffold";
import FlexContainer from "../../components/FlexContainer";
import NavigationIcon from "@material-ui/icons/Navigation";
import {useNavigate} from "react-router-dom";
import ClassId from "../../model/identifier/ClassId";
import {classService} from "../../service/provider/ServiceProvider";
import {useLocation} from "react-router";
import WeekId from "../../model/identifier/WeekId";
import Lecture from "../../model/Lecture";
import LectureId from "../../model/identifier/LectureId";


const LectureUpdate: React.FC = () => {
    const [lectureName, setLectureName] = useState<string>("");
    const [teacherName, setTeacherName] = useState<string>("");

    const location = useLocation();
    const navigate = useNavigate();

    const targetClassId: ClassId = new ClassId(location.state.classId._id);
    const targetClassName: string = location.state.className;
    const targetWeekId: WeekId = new WeekId(location.state.weekId._id);

    const handleLectureNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLectureName(event.target.value);
    }

    const handleTeacherNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTeacherName(event.target.value);
    }

    const createLecture = async () => {
        if (lectureName === "" || lectureName === null || lectureName === undefined) return;
        if (teacherName === "" || teacherName === null || teacherName === undefined) return;

        const newLecture: Lecture = new Lecture(
            new LectureId("none"),
            targetClassId,
            targetWeekId,
            lectureName,
            teacherName
        );
        const lecture: Lecture = await classService.addLecture(targetClassId, newLecture);
        navigate(-1);
    }

    return <Scaffold>
        <Typography
            sx={{
                m: "20px",
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            Create Lecture
        </Typography>
        <Typography
            sx={{
                m: "20px",
                fontSize: { xs: '15px', sm: "25px" }
            }}
        >
            {`class: ${targetClassName} | week: ${targetWeekId.formedId}`}
        </Typography>
        <FlexContainer flexWrap='wrap' {...{marginLeft: "20px"}}>
            <Typography
                sx={{
                    m: "20px",
                    fontSize: { xs: '15px', sm: "20px" }
                }}
            >
                Input lecture name
            </Typography>
            <TextField
                required
                label="Required"
                value={lectureName}
                placeholder="lecture name"
                variant="standard"
                onChange={handleLectureNameChange}
                size="small"
                sx={{ width: "200px" }}
            />
        </FlexContainer>
        <FlexContainer flexWrap='wrap' {...{marginLeft: "20px"}}>
            <Typography
                sx={{
                    m: "20px",
                    fontSize: { xs: '15px', sm: "20px" }
                }}
            >
                Input teacher name
            </Typography>
            <TextField
                required
                label="Required"
                value={teacherName}
                placeholder="teacher name"
                variant="standard"
                onChange={handleTeacherNameChange}
                size="small"
                sx={{ width: "200px" }}
            />
        </FlexContainer>
        <FlexContainer width="100%" justifyContent="flex-end" {...{ padding: "20px" }}>
            <Fab variant="extended" color="primary" onClick={createLecture}>
                <NavigationIcon />
                Submit
            </Fab>
        </FlexContainer>
    </Scaffold>;
}


export default LectureUpdate;
