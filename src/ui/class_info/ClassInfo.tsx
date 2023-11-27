import React from "react";
import ClassStudentsInfo from "./ClassStudentsInfo";
import Scaffold from "../../components/Scaffold";
import {useLocation} from "react-router";
import StudentId from "../../model/identifier/StudentId";
import Class from "../../model/Class";
import ClassId from "../../model/identifier/ClassId";
import {Typography} from "@mui/material";


interface ClassInfoProps {
    drawerWidth: number;
}


const ClassInfo: React.FC<ClassInfoProps> = ({
    drawerWidth
}) => {
    const location = useLocation();
    const classInfo = location.state.classObject;
    const classStudentIdList: Array<StudentId> = classInfo._studentIdList.map(
        (studentId: { _id: any }) => new StudentId(studentId._id)
    );
    const classObject: Class = new Class(
        new ClassId(classInfo._id._id),
        classStudentIdList
    );


    return <Scaffold>
        <Typography
            sx={{
                m: "20px",
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            {classObject.idString}
        </Typography>
        <ClassStudentsInfo drawerWidth={drawerWidth} classObject={classObject} />
    </Scaffold>;
};

export default ClassInfo;
