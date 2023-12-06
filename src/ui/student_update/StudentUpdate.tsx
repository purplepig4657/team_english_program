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
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import dayjs, {Dayjs} from "dayjs";


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
    const [selectedClassNames, setSelectedClassNames] = React.useState<string[]>([]);
    const [studentName, setStudentName] = React.useState<string>("");
    const [studentEnglishName, setStudentEnglishName] = React.useState<string>("");
    const [tuitionDate, setTuitionDate] = React.useState<Dayjs | null>(null);
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
            studentObject._classNameList,
            studentObject._name,
            studentObject._englishName,
            studentObject._createdAt,
            studentObject._updatedAt,
            studentObject._tuitionDate,
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
            setStudentEnglishName(targetStudent.englishName);
            setSelectedClassIds(classIdStringList);
            setTuitionDate(dayjs(targetStudent.tuitionDate));

            setSelectedClassNames(targetStudent.classNameList);
        }
    }, []);


    const updateStudent = async () => {
        if (studentName === "" || studentName === null || studentName === undefined) return;
        if (tuitionDate === null || tuitionDate === undefined) return;

        const newClassIdList: Array<ClassId> = selectedClassNames.map((name: string) => {
            const targetClass: Class | undefined = classList.find((classObject: Class) => classObject.name === name);
            if (targetClass === undefined) throw "error";
            else return targetClass.id;
        });

        targetStudent.changeName(studentName);
        targetStudent.changeEnglishName(studentEnglishName);
        targetStudent.changeClassIdList(newClassIdList);
        targetStudent.changeClassNameList(selectedClassNames);
        targetStudent.changeTuitionDate(tuitionDate.toDate());
        const isSuccess: boolean = await studentService.updateStudentBothStoreAndCache(targetStudent);
        if (isSuccess) navigate(-1);
    };

    const createStudent = async () => {
        if (studentName === "" || studentName === null || studentName === undefined) return;
        if (tuitionDate === null || tuitionDate === undefined) return;

        const classIdList: Array<ClassId> = selectedClassNames.map((name: string) => {
            const targetClass: Class | undefined = classList.find((classObject: Class) => classObject.name === name);
            if (targetClass === undefined) throw "error";
            else return targetClass.id;
        });

        const newStudent: Student = new Student(
            new StudentId("none"),
            classIdList,
            selectedClassNames,
            studentName,
            studentEnglishName,
            new Date(),
            new Date(),
            tuitionDate.toDate()
        );

        const student: Student = await studentService.createStudent(newStudent);

        navigate(-1);
    };

    const handleSelectChange = (event: SelectChangeEvent<typeof selectedClassNames>) => {
        const {
            target: { value },
        } = event;
        setSelectedClassNames(typeof value === 'string' ? value.split(',') : value);
    };

    const handleStudentNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStudentName(event.target.value);
    };

    const handleStudentEnglishNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStudentEnglishName(event.target.value);
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
                onChange={handleStudentNameChange}
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
                Input student english name
            </Typography>
            <TextField
                required
                label="Required"
                // defaultValue=""
                value={studentEnglishName}
                placeholder="student name"
                variant="standard"
                onChange={handleStudentEnglishNameChange}
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
                    value={selectedClassNames}
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
                            key={classObject.name}
                            value={classObject.name}
                        >
                            {classObject.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </FlexContainer>
        <FlexContainer flexWrap='wrap' {...{marginLeft: "20px"}}>
            <Typography
                sx={{
                    m: "20px",
                    fontSize: { xs: '15px', sm: "20px" }
                }}
            >
                Select tuition date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="Choose tuition date"
                        value={tuitionDate}
                        onChange={(newValue) => setTuitionDate(newValue)}
                    />
                </DemoContainer>
            </LocalizationProvider>
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
