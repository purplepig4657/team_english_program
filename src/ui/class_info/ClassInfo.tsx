import React, {useState} from "react";
import ClassStudentsInfo from "./class_students_info/ClassStudentsInfo";
import Scaffold from "../../components/Scaffold";
import {useLocation} from "react-router";
import Class from "../../model/Class";
import ClassId from "../../model/identifier/ClassId";
import {Fab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import ClassLecturesInfo from "./class_lectures_info/ClassLecturesInfo";
import WeekId from "../../model/identifier/WeekId";
import FlexContainer from "../../components/FlexContainer";
import AddIcon from "@material-ui/icons/Add";
import {useNavigate} from "react-router-dom";


interface ClassInfoProps {
    drawerWidth: number;
}


const ClassInfo: React.FC<ClassInfoProps> = ({
    drawerWidth
}) => {
    const [weekSelect, setWeekSelect] = useState<string>(WeekId.thisWeek().id);

    const navigate = useNavigate();
    const location = useLocation();
    const classInfo = location.state.classObject;

    const classObject: Class = new Class(
        new ClassId(classInfo._id._id)
    );

    const weekList: Array<WeekId> = [];
    let weekTmp: WeekId = WeekId.thisWeek();

    for (let i = 0; i < 5; i++) {
        weekList.push(weekTmp);
        weekTmp = weekTmp.lastWeekFromSelf();
    }

    const handleWeekSelectChange = (event: SelectChangeEvent) => {
        setWeekSelect(event.target.value as string);
    };

    const makeLectureClick = () => {
        navigate("/lecture_update", {
            state: {
                classId: classObject.id,
                weekId: new WeekId(weekSelect)
            }
        });
    };

    return <Scaffold>
        <FlexContainer justifyContent="space-between" alignItems="center">
            <Typography
                sx={{
                    m: "20px",
                    fontSize: { xs: '30px', sm: "40px" }
                }}
            >
                {classObject.idString}
            </Typography>
            <FormControl sx={{ width: 200, mr: 5 }}>
                <InputLabel>Select a week</InputLabel>
                <Select
                    value={weekSelect}
                    label="Select a week"
                    onChange={handleWeekSelectChange}
                >
                    {weekList
                        .map((weekId: WeekId) => {
                            return <MenuItem key={weekId.id} value={weekId.id}>{weekId.id}</MenuItem>
                        })

                    }
                </Select>
            </FormControl>
        </FlexContainer>
        <ClassStudentsInfo drawerWidth={drawerWidth} classObject={classObject} />
        <FlexContainer justifyContent="space-between" alignItems="center">
            <Typography
                sx={{
                    m: "30px",
                    fontSize: { xs: '20px', sm: "30px" }
                }}
            >
                Lectures
            </Typography>
            <Fab
                variant="extended"
                color="primary"
                onClick={makeLectureClick}
                sx={{ height: 40, mr: "30px" }}
            >
                <AddIcon />
                Make Lecture
            </Fab>
        </FlexContainer>
        <ClassLecturesInfo classId={classObject.id} weekId={new WeekId(weekSelect)} />
    </Scaffold>;
};

export default ClassInfo;
