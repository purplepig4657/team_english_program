import ConstantWeight from "../model/ConstantWeight";

export let ISSUE_THRESHOLD = 0;
export let LATENESS_WEIGHT = 1;
export let ABSENCE_WEIGHT = 1;
export let ATTITUDE_WEIGHT = 1;
export let SCORE_ISSUE_WEIGHT = 1;
export let CONSULTATION_WEIGHT = 1;
export let constantWeight: ConstantWeight;

export const setGlobalIssueThreshold = (newIssueThreshold: number) => {
    ISSUE_THRESHOLD = newIssueThreshold;
};

export const setGlobalLatenessWeight = (newLatenessWeight: number) => {
    LATENESS_WEIGHT = newLatenessWeight;
};

export const setGlobalAbsenceWeight = (newAbsenceWeight: number) => {
    ABSENCE_WEIGHT = newAbsenceWeight;
};

export const setGlobalAttitudeWeight = (newAttitudeWeight: number) => {
    ATTITUDE_WEIGHT = newAttitudeWeight;
};

export const setGlobalScoreIssueWeight = (newScoreIssueWeight: number) => {
    SCORE_ISSUE_WEIGHT = newScoreIssueWeight;
};

export const setGlobalConsultationWeight = (newConsultationWeight: number) => {
    CONSULTATION_WEIGHT = newConsultationWeight;
};

export const setConstantWeight = (newConstantWeight: ConstantWeight) => {
    constantWeight = newConstantWeight;
}
