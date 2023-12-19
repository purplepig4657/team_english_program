import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Class from "../../../model/Class";
import {useNavigate} from "react-router-dom";
import {classService} from "../../../service/provider/ServiceProvider";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FlexContainer from "../../../components/FlexContainer";


interface ClassCardProps {
    classObject: Class;
    editMode: boolean;
    classDisableCallback: (disabledClass: Class) => void;
}


const ClassCard: React.FC<ClassCardProps> = ({
    classObject,
    editMode,
    classDisableCallback
}) => {
    const [studentCount, setStudentCount] = useState<number>(0);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setStudentCount((await classService.getAllClassStudent(classObject.id)).length)
        })();
    }, [editMode]);

    const classInfoClick = (classObject: Class) => {
        navigate("/class_info", { state: { classObject: classObject } })
    }

    const classUpdateClick = (classObject: Class) => {
        navigate("/class_update", { state: { classObject: classObject } })
    }

    const disableClass = async (classObject: Class) => {
        classObject.disableClass();
        await classService.disableClass(classObject);
        classDisableCallback(classObject);
    }


    return (
        <Card sx={{ minWidth: 250, flexGrow: 1, m: "10px" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Hello, world!
                </Typography>
                <Typography variant="h5" component="div">
                    {classObject.name}
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                    {studentCount} students
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => classInfoClick(classObject)}>Enter</Button>
                {editMode && <IconButton
                    size="small"
                    onClick={() => classUpdateClick(classObject)}
                    sx={{ mr: 1 }}
                >
                    <EditIcon />
                </IconButton>}
                {editMode && <IconButton
                    size="small"
                    color="warning"
                    onClick={() => disableClass(classObject)}
                >
                    <DeleteIcon />
                </IconButton>}
            </CardActions>
        </Card>
    );
}

export default ClassCard;
