import React, {useEffect, useState} from "react";
import Scaffold from "../../components/Scaffold";
import {Fab, Typography} from "@mui/material";
import FlexContainer from "../../components/FlexContainer";
import Class from "../../model/Class";
import ClassCard from "./component/ClassCard";
import { classService } from "../../service/provider/ServiceProvider";
import AddIcon from "@material-ui/icons/Add";
import { useNavigate } from "react-router-dom";


const ClassList = (): JSX.Element => {
    const [classList, setClassList] = useState<Array<Class>>([]);

    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            setClassList(await classService.getAllClass());
        })();
    }, []);

    const classCreateClick = () => {
        navigate("/class_update")
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
                return <ClassCard key={classObject.idString} classObject={classObject} />
            })}
        </FlexContainer>
        <FlexContainer justifyContent="flex-end" {...{ padding: "0 20px" }}>
            <Fab size="medium" color="primary" onClick={classCreateClick}>
                <AddIcon />
            </Fab>
        </FlexContainer>
    </Scaffold>;
};

export default ClassList;
