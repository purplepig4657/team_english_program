import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import {Tab, Tabs} from "@mui/material";
import LectureTab from "./component/LectureTab";
import Lecture from "../../../model/Lecture";
import {lectureService} from "../../../service/provider/ServiceProvider";
import ClassId from "../../../model/identifier/ClassId";
import WeekId from "../../../model/identifier/WeekId";


interface ClassLecturesInfoProps {
    classId: ClassId;
    weekId: WeekId;
}


const ClassLecturesInfo: React.FC<ClassLecturesInfoProps> = ({
    classId,
    weekId
}) => {
    const [tabValue, setTabValue] = React.useState<number>(0);
    const [lectureList, setLectureList] = React.useState<Array<Lecture>>([]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        (async () => {
            const lectureList: Array<Lecture> =
                await lectureService.getAllLectureListByClassIdAndWeekId(classId, weekId);
            setLectureList(lectureList);
        })();
    }, [weekId]);

    return <>
        <Box sx={{ width: "100%", minHeight: "600px", p: "0 30px" }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    {lectureList
                        .map((lecture: Lecture) => {
                            return <Tab key={lecture.idString} label={lecture.name} />
                        })
                    }
                </Tabs>
            </Box>
            {lectureList
                .map((lecture: Lecture, index: number) => {
                    return <LectureTab
                        key={lecture.idString}
                        classId={classId}
                        lecture={lecture}
                        index={index}
                        value={tabValue}
                    />
                })
            }
        </Box>
    </>;
}

export default ClassLecturesInfo;
