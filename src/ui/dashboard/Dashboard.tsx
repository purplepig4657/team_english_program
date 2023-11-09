import React, {useEffect} from "react";
import Scaffold from "../../components/Scaffold";
import { Typography } from "@mui/material";
import FlexContainer from "../../components/FlexContainer";
import ClassWeekRepositoryImpl from "../../repository/firebase/ClassWeekRepositoryImpl";
import ClassWeekRepository from "../../repository/interface/ClassWeekRepository";
import ClassWeekId from "../../model/identifier/ClassWeekId";
import LectureId from "../../model/identifier/LectureId";
import ClassWeek from "../../model/ClassWeek";

const Dashboard = (): JSX.Element => {
    useEffect(() => {
        // (async () => {
        //     const classWeekRepository: ClassWeekRepository = new ClassWeekRepositoryImpl();
        //     const data = await classWeekRepository.create(
        //         new ClassWeek(new ClassWeekId("asdf"), new ClassWeekId("asdf"), new Array<LectureId>())
        //     );
        //     console.log(data);
        // })();
        (async () => {
            const classWeekRepository: ClassWeekRepository = new ClassWeekRepositoryImpl();
            const data = await classWeekRepository.get(new ClassWeekId("6QVmSCsXmF2g2b7farEN"));
            console.log(data);
            console.log(await classWeekRepository.delete(new ClassWeekId("6QVmSCsXmF2g2b7farEN")));
            console.log(await classWeekRepository.update(new ClassWeek(new ClassWeekId("Qddr7cjEXsD1GgUTdXMk"), new ClassWeekId("asdfasdf"), new Array<LectureId>())));
            const data2 = await classWeekRepository.getAll();
            console.log(data2);
        })();
    }, []);

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
