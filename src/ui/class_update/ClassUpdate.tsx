import React, {useState} from "react";
import {Fab, TextField, Typography} from "@mui/material";
import Scaffold from "../../components/Scaffold";
import FlexContainer from "../../components/FlexContainer";
import NavigationIcon from "@material-ui/icons/Navigation";
import {useNavigate} from "react-router-dom";
import Class from "../../model/Class";
import ClassId from "../../model/identifier/ClassId";
import {classService} from "../../service/provider/ServiceProvider";

const ClassUpdate: React.FC = () => {
    const [className, setClassName] = useState<string>("");

    const navigate = useNavigate();

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassName(event.target.value);
    }

    const createClass = async () => {
        const newClass: Class = new Class(new ClassId(className));
        const classObject: Class | null = await classService.createClass(newClass);
        if (classObject !== null) navigate(-1);
    }

    return <Scaffold>
        <Typography
            sx={{
                m: "20px",
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            Create Class
        </Typography>
        <FlexContainer flexWrap='wrap' {...{marginLeft: "20px"}}>
            <Typography
                sx={{
                    m: "20px",
                    fontSize: { xs: '15px', sm: "20px" }
                }}
            >
                Input class name
            </Typography>
            <TextField
                required
                label="Required"
                value={className}
                placeholder="class name"
                variant="standard"
                onChange={handleTextFieldChange}
                size="small"
                sx={{ width: "200px" }}
            />
        </FlexContainer>
        <FlexContainer width="100%" justifyContent="flex-end" {...{ padding: "20px" }}>
            <Fab variant="extended" color="primary" onClick={createClass}>
                <NavigationIcon />
                Submit
            </Fab>
        </FlexContainer>
    </Scaffold>;
}


export default ClassUpdate;
