import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Class from "../../../model/Class";
import {useNavigate} from "react-router-dom";
import {classService} from "../../../service/provider/ServiceProvider";


interface ClassCardProps {
    classObject: Class;
}


const ClassCard: React.FC<ClassCardProps> = ({
    classObject
}) => {
    const [studentCount, setStudentCount] = useState<number>(0);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setStudentCount((await classService.getAllClassStudent(classObject.id)).length)
        })();
    }, []);

    const classInfoClick = (classObject: Class) => {
        navigate("/class_info", { state: { classObject: classObject } })
    }


    return (
        <Card sx={{ minWidth: 250, flexGrow: 1, m: "10px" }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Hello, world!
                </Typography>
                <Typography variant="h5" component="div">
                    {classObject.id.id}
                </Typography>
                <Typography sx={{ mt: 1 }} color="text.secondary">
                    {studentCount} students
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => classInfoClick(classObject)}>Enter</Button>
            </CardActions>
        </Card>
    );
}

export default ClassCard;
