import React from "react";
import Scaffold from "../../components/Scaffold";
import { Typography } from "@mui/material";

const ClassList = (): JSX.Element => {
    return <Scaffold>
        <Typography 
            sx={{
                m: "20px", 
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            ClassList
        </Typography>
    </Scaffold>;
};

export default ClassList;
