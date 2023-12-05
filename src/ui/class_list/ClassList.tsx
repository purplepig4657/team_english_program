import React, {useEffect, useState} from "react";
import Scaffold from "../../components/Scaffold";
import {Fab, ToggleButton, Typography} from "@mui/material";
import FlexContainer from "../../components/FlexContainer";
import Class from "../../model/Class";
import ClassCard from "./component/ClassCard";
import { classService } from "../../service/provider/ServiceProvider";
import AddIcon from "@material-ui/icons/Add";
import { useNavigate } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";


const ClassList = (): JSX.Element => {
    const [classList, setClassList] = useState<Array<Class>>([]);
    const [editToggle, setEditToggle] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setClassList(await classService.getAllClass());
        })();
    }, []);

    const classCreateClick = () => {
        navigate("/class_update", { state: { classObject: null } })
    };

    const classDisableCallback = (disabledClass: Class) => {
        setClassList(classList.filter((classObject: Class) => classObject.idString !== disabledClass.idString));
    }

    return <Scaffold>
        <Typography 
            sx={{
                m: "20px", 
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            ClassList
        </Typography>
        <FlexContainer flexWrap='wrap' {...{padding: "10px"}}>
            {classList.map((classObject) => {
                return !classObject.disabled && (
                    <ClassCard
                        key={classObject.idString}
                        classObject={classObject}
                        editMode={editToggle}
                        classDisableCallback={classDisableCallback}
                    />
                )
            })}
        </FlexContainer>
        <FlexContainer justifyContent="flex-end" {...{ padding: "0 20px" }}>
            <ToggleButton
                value="check"
                selected={editToggle}
                onChange={() => {
                    setEditToggle(!editToggle);
                }}
                sx={{
                    mr: 2,
                    p: 1
                }}
            >
                <EditIcon />
            </ToggleButton>
            <Fab size="medium" color="primary" onClick={classCreateClick}>
                <AddIcon />
            </Fab>
        </FlexContainer>
    </Scaffold>;
};

export default ClassList;
