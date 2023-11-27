import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import React from "react";
import Class from "../../../model/Class";
import {useNavigate} from "react-router-dom";


interface ClassCardProps {
    classObject: Class;
}


const ClassCard: React.FC<ClassCardProps> = ({
    classObject
}) => {
    const navigate = useNavigate();

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
                    {classObject.studentIdList.length} students
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => classInfoClick(classObject)}>Enter</Button>
            </CardActions>
        </Card>
    );
}

export default ClassCard;
