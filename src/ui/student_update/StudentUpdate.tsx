import React from "react";
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


// interface StudentUpdateProps {
//     updatingStudent: Student | null;  // If null, it is creating student.
// }


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

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];



const StudentUpdate: React.FC = () => {
    const location = useLocation();
    const studentObject = location.state.student;

    const mode: string = studentObject === null ? 'create' : 'update';


    const updateStudent = () => {
        const classIdList: Array<ClassId> = studentObject._classIdList.map(
            (classId: { _id: any }) => new ClassId(classId._id)
        );
        const student: Student = new Student(
            new StudentId(studentObject._id._id),
            classIdList,
            studentObject._name,
            studentObject._createdAt
        );
    };

    const createStudent = () => {
        console.log(personName);
    };


    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(typeof value === 'string' ? value.split(',') : value);
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
                id="standard-required"
                label="Required"
                defaultValue=""
                placeholder="student name"
                variant="standard"
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
                <InputLabel>Chip</InputLabel>
                <Select
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Chip" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </FlexContainer>
        <FlexContainer width="100%" justifyContent="flex-end" {...{ padding: "20px" }}>
            <Fab variant="extended" color="primary" onClick={createStudent}>
                <NavigationIcon />
                Submit
            </Fab>
        </FlexContainer>
    </Scaffold>;
};

export default StudentUpdate;
