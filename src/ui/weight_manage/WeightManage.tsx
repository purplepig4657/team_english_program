import React, {useEffect, useState} from "react";
import Scaffold from "../../components/Scaffold";
import {Fab, TextField, Typography} from "@mui/material";
import FlexContainer from "../../components/FlexContainer";
import {
    ABSENCE_WEIGHT,
    ATTITUDE_WEIGHT, CONSULTATION_WEIGHT,
    ISSUE_THRESHOLD,
    LATENESS_WEIGHT, SCORE_ISSUE_WEIGHT, setGlobalAbsenceWeight, setGlobalAttitudeWeight, setGlobalConsultationWeight,
    setGlobalIssueThreshold, setGlobalLatenessWeight, setGlobalScoreIssueWeight
} from "../../constants/GlobalWeight";
import NavigationIcon from "@material-ui/icons/Navigation";
import {useNavigate} from "react-router-dom";
import {constantWeightService} from "../../service/provider/ServiceProvider";
import ConstantWeight from "../../model/ConstantWeight";

const WeightManage = (): JSX.Element => {
    const [issueThreshold, setIssueThreshold] = useState<number>(0);
    const [latenessWeight, setLatenessWeight] = useState<number>(1);
    const [absenceWeight, setAbsenceWeight] = useState<number>(1);
    const [attitudeWeight, setAttitudeWeight] = useState<number>(1);
    const [scoreIssueWeight, setScoreIssueWeight] = useState<number>(1);
    const [consultationWeight, setConsultationWeight] = useState<number>(1);

    const navigate = useNavigate();

    useEffect(() => {
        setIssueThreshold(ISSUE_THRESHOLD);
        setLatenessWeight(LATENESS_WEIGHT);
        setAbsenceWeight(ABSENCE_WEIGHT);
        setAttitudeWeight(ATTITUDE_WEIGHT);
        setScoreIssueWeight(SCORE_ISSUE_WEIGHT);
        setConsultationWeight(CONSULTATION_WEIGHT);
    }, []);

    const handleIssueThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, '');
        setIssueThreshold(Number(numericValue));
    };

    const handleLatenessWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, '');
        setLatenessWeight(Number(numericValue));
    };

    const handleAbsenceWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, '');
        setAbsenceWeight(Number(numericValue));
    };

    const handleAttitudeWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, '');
        setAttitudeWeight(Number(numericValue));
    };

    const handleScoreIssueWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, '');
        setScoreIssueWeight(Number(numericValue));
    };

    const handleConsultationWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, '');
        setConsultationWeight(Number(numericValue));
    };

    const submitChanges = async () => {
        setGlobalIssueThreshold(issueThreshold);
        setGlobalLatenessWeight(latenessWeight);
        setGlobalAbsenceWeight(absenceWeight);
        setGlobalAttitudeWeight(attitudeWeight);
        setGlobalScoreIssueWeight(scoreIssueWeight);
        setGlobalConsultationWeight(consultationWeight);
        const isSuccess = await constantWeightService.updateConstantWeight(new ConstantWeight(
            issueThreshold,
            latenessWeight,
            absenceWeight,
            attitudeWeight,
            scoreIssueWeight,
            consultationWeight
        ));
        if (isSuccess) navigate(-1);
    };


    return <Scaffold>
        <Typography 
            sx={{
                m: "20px", 
                fontSize: { xs: '30px', sm: "40px" }
            }}
        >
            Weight Management
        </Typography>
        <FlexContainer flexDirection="column">
            <FlexContainer flexWrap='wrap' {...{marginLeft: "20px"}}>
                <Typography
                    sx={{
                        m: "20px",
                        fontSize: { xs: '15px', sm: "20px" }
                    }}
                >
                    Input Issue Threshold
                </Typography>
                <TextField
                    required
                    label="Required"
                    value={issueThreshold}
                    placeholder="Issue Threshold"
                    variant="standard"
                    onChange={handleIssueThresholdChange}
                    size="small"
                    sx={{ width: "200px" }}
                />
            </FlexContainer>
            <FlexContainer flexWrap='wrap' {...{marginLeft: "20px"}}>
                <Typography
                    sx={{
                        m: "20px",
                        fontSize: { xs: '15px', sm: "20px" }
                    }}
                >
                    Input Lateness Weight
                </Typography>
                <TextField
                    required
                    label="Required"
                    value={latenessWeight}
                    placeholder="Lateness Weight"
                    variant="standard"
                    onChange={handleLatenessWeightChange}
                    size="small"
                    sx={{ width: "200px" }}
                />
            </FlexContainer>
            <FlexContainer flexWrap='wrap' {...{marginLeft: "20px"}}>
                <Typography
                    sx={{
                        m: "20px",
                        fontSize: { xs: '15px', sm: "20px" }
                    }}
                >
                    Input Absence Weight
                </Typography>
                <TextField
                    required
                    label="Required"
                    value={absenceWeight}
                    placeholder="Absence Weight"
                    variant="standard"
                    onChange={handleAbsenceWeightChange}
                    size="small"
                    sx={{ width: "200px" }}
                />
            </FlexContainer>
            <FlexContainer flexWrap='wrap' {...{marginLeft: "20px"}}>
                <Typography
                    sx={{
                        m: "20px",
                        fontSize: { xs: '15px', sm: "20px" }
                    }}
                >
                    Input Attitude Weight
                </Typography>
                <TextField
                    required
                    label="Required"
                    value={attitudeWeight}
                    placeholder="Attitude Weight"
                    variant="standard"
                    onChange={handleAttitudeWeightChange}
                    size="small"
                    sx={{ width: "200px" }}
                />
            </FlexContainer>
            <FlexContainer flexWrap='wrap' {...{marginLeft: "20px"}}>
                <Typography
                    sx={{
                        m: "20px",
                        fontSize: { xs: '15px', sm: "20px" }
                    }}
                >
                    Input Score Issue Weight
                </Typography>
                <TextField
                    required
                    label="Required"
                    value={scoreIssueWeight}
                    placeholder="Score Issue Weight"
                    variant="standard"
                    onChange={handleScoreIssueWeightChange}
                    size="small"
                    sx={{ width: "200px" }}
                />
            </FlexContainer>
            <FlexContainer flexWrap='wrap' {...{marginLeft: "20px"}}>
                <Typography
                    sx={{
                        m: "20px",
                        fontSize: { xs: '15px', sm: "20px" }
                    }}
                >
                    Input Consultation Weight
                </Typography>
                <TextField
                    required
                    label="Required"
                    value={consultationWeight}
                    placeholder="Score Issue Weight"
                    variant="standard"
                    onChange={handleConsultationWeightChange}
                    size="small"
                    sx={{ width: "200px" }}
                />
            </FlexContainer>
        </FlexContainer>
        <FlexContainer width="100%" justifyContent="flex-end" {...{ padding: "20px" }}>
            <Fab variant="extended" color="primary" onClick={submitChanges}>
                <NavigationIcon />
                Submit
            </Fab>
        </FlexContainer>
    </Scaffold>;
};

export default WeightManage;
