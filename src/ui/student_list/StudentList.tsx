import React from "react";
import Scaffold from "../../components/Scaffold";
import { Typography } from "@mui/material";

const StudentList = (): JSX.Element => {
    return <Scaffold>
        <Typography 
            sx={{
                m: "20px", 
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            StudentList
        </Typography>
    </Scaffold>;
};

export default StudentList;
