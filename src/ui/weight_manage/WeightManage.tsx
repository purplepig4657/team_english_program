import React from "react";
import Scaffold from "../../components/Scaffold";
import { Typography } from "@mui/material";

const WeightManage = (): JSX.Element => {
    return <Scaffold>
        <Typography 
            sx={{
                m: "20px", 
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            Weight Management
        </Typography>
    </Scaffold>;
};

export default WeightManage;
