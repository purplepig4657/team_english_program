import React, {useEffect} from "react";
import Student from "../../model/Student";
import {useLocation} from "react-router";
import ClassId from "../../model/identifier/ClassId";
import StudentId from "../../model/identifier/StudentId";
import Scaffold from "../../components/Scaffold";
import {
    Chip, Fab,
    FormControl,
    InputLabel, MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import FlexContainer from "../../components/FlexContainer";
import Box from "@mui/material/Box";
import NavigationIcon from "@material-ui/icons/Navigation";
import Class from "../../model/Class";
import {classService, studentService} from "../../service/provider/ServiceProvider";
import {useNavigate} from "react-router-dom";


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const StudentUpdate: React.FC = () => {
    const [selectedClassIds, setSelectedClassIds] = React.useState<string[]>([]);
    const [studentName, setStudentName] = React.useState<string>("");
    const [classList, setClassList] = React.useState<Array<Class>>([]);

    const location = useLocation();
    const navigate = useNavigate();
    const studentObject = location.state.student;

    const mode: string = studentObject === null ? 'create' : 'update';

    let targetStudent: Student;

    if (mode === 'update') {
        const classIdList: Array<ClassId> = studentObject._classIdList.map(
            (classId: { _id: any }) => new ClassId(classId._id)
        );
        targetStudent = new Student(
            new StudentId(studentObject._id._id),
            classIdList,
            studentObject._name,
            studentObject._createdAt,
            studentObject._updatedAt
        );
    }

    useEffect(() => {
        (async () => {
            const classList: Array<Class> = await classService.getAllClass();
            setClassList(classList);
        })();

        if (mode === 'update') {
            const classIdStringList: Array<string> = targetStudent.classIdList.map((classId: ClassId) => classId.id);
            setStudentName(targetStudent.name);
            setSelectedClassIds(classIdStringList);
        }
    }, []);


    const updateStudent = async () => {
        const newClassList: Array<ClassId> = selectedClassIds.map((classId: string) => new ClassId(classId));
        targetStudent.changeName(studentName);
        targetStudent.changeClassIdList(newClassList);
        const isSuccess: boolean = await studentService.updateStudentBothStoreAndCache(targetStudent);
        if (isSuccess) navigate(-1);
    };

    const createStudent = async () => {
        if (studentName === "" || studentName === null || studentName === undefined) return;

        const classIdList: Array<ClassId> = selectedClassIds.map((id: string) => new ClassId(id));

        const newStudent: Student = new Student(
            new StudentId("none"),
            classIdList,
            studentName,
            new Date(),
            new Date()
        );

        const student: Student = await studentService.createStudent(newStudent);

        navigate(-1);
    };

    const handleSelectChange = (event: SelectChangeEvent<typeof selectedClassIds>) => {
        const {
            target: { value },
        } = event;
        setSelectedClassIds(typeof value === 'string' ? value.split(',') : value);
    };

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStudentName(event.target.value);
    };

    return <Scaffold>
        <Typography
            sx={{
                m: "20px",
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            {mode === 'create' ? 'Create Student' : 'Update Student'}
        </Typography>
        <FlexContainer flexWrap='wrap' {...{marginLeft: "20px"}}>
            <Typography
                sx={{
                    m: "20px",
                    fontSize: { xs: '15px', sm: "20px" }
                }}
            >
                Input student name
            </Typography>
            <TextField
                required
                label="Required"
                // defaultValue=""
                value={studentName}
                placeholder="student name"
                variant="standard"
                onChange={handleTextFieldChange}
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
                Select class
            </Typography>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel>Choose class</InputLabel>
                <Select
                    multiple
                    value={selectedClassIds}
                    onChange={handleSelectChange}
                    input={<OutlinedInput label="Choose class" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {classList.map((classObject: Class) => (
                        <MenuItem
                            key={classObject.idString}
                            value={classObject.idString}
                        >
                            {classObject.idString}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </FlexContainer>
        <FlexContainer width="100%" justifyContent="flex-end" {...{ padding: "20px" }}>
            <Fab variant="extended" color="primary" onClick={mode === 'create' ? createStudent : updateStudent}>
                <NavigationIcon />
                Submit
            </Fab>
        </FlexContainer>
    </Scaffold>;
};

export default StudentUpdate;
