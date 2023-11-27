import React, {useEffect, useState} from "react";
import Scaffold from "../../components/Scaffold";
import {Typography} from "@mui/material";
import FlexContainer from "../../components/FlexContainer";
import Class from "../../model/Class";
import ClassCard from "./component/ClassCard";
import { classService } from "../../service/provider/ServiceProvider";


const ClassList = (): JSX.Element => {
    const [classList, setClassList] = useState<Array<Class>>([]);

    useEffect(() => {
        (async () => {
            setClassList(await classService.getAllClass());
        })();
    }, []);

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
    </Scaffold>;
};

export default ClassList;
