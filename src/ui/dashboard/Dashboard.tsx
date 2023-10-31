import React from "react";
import Scaffold from "../../components/Scaffold";
import { Typography } from "@mui/material";
import FlexContainer from "../../components/FlexContainer";

const Dashboard = (): JSX.Element => {
    return <Scaffold>
        <Typography 
            sx={{
                m: "20px", 
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            Dashboard
        </Typography>
        <FlexContainer justifyContent="center" flexDirection="row">
            <FlexContainer>
                adfasfdsadf|||||||
            </FlexContainer>
            <FlexContainer> 
                asdfasdfasd
            </FlexContainer>
        </FlexContainer>
    </Scaffold>;
};

export default Dashboard;
