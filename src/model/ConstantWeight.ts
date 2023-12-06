import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

export default class ConstantWeight {
    private _issueThreshold: number;
    private _latenessWeight: number;
    private _absenceWeight: number;
    private _attitudeWeight: number;
    private _scoreIssueWeight: number;
    private _consultationWeight: number;

    constructor(
        issueThreshold: number,
        latenessWeight: number,
        absenceWeight: number,
        attitudeWeight: number,
        scoreIssueWeight: number,
        consultationWeight: number
    ) {
        this._issueThreshold = issueThreshold;
        this._latenessWeight = latenessWeight;
        this._absenceWeight = absenceWeight;
        this._attitudeWeight = attitudeWeight;
        this._scoreIssueWeight = scoreIssueWeight;
        this._consultationWeight = consultationWeight;
    }

    changeLatenessWeight(newWeight: number): void {
        this._latenessWeight = newWeight;
    }

    changeAbsenceWeight(newWeight: number): void {
        this._absenceWeight = newWeight;
    }

    changeAttitudeWeight(newWeight: number): void {
        this._attitudeWeight = newWeight;
    }

    changeScoreIssueWeight(newWeight: number): void {
        this._scoreIssueWeight = newWeight;
    }

    changeConsultationWeight(newWeight: number): void {
        this._consultationWeight = newWeight;
    }

    // Getter

    get issueThreshold(): number {
        return this._issueThreshold;
    }

    get latenessWeight(): number {
        return this._latenessWeight;
    }

    get absenceWeight(): number {
        return this._absenceWeight;
    }

    get attitudeWeight(): number {
        return this._attitudeWeight;
    }

    get scoreIssueWeight(): number {
        return this._scoreIssueWeight;
    }

    get consultationWeight(): number {
        return this._consultationWeight;
    }

}

interface ConstantWeightDBModel extends DocumentData {
    issueThreshold: number;
    latenessWeight: number;
    absenceWeight: number;
    attitudeWeight: number;
    scoreIssueWeight: number;
    consultationWeight: number;
}

export const constantWeightConverter: FirestoreDataConverter<ConstantWeight, ConstantWeightDBModel> = {
    toFirestore: (constantWeight: ConstantWeight): ConstantWeightDBModel => {
        return {
            issueThreshold: constantWeight.issueThreshold,
            latenessWeight: constantWeight.latenessWeight,
            absenceWeight: constantWeight.absenceWeight,
            attitudeWeight: constantWeight.attitudeWeight,
            scoreIssueWeight: constantWeight.scoreIssueWeight,
            consultationWeight: constantWeight.consultationWeight,
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<ConstantWeightDBModel, ConstantWeightDBModel>,
        options?: SnapshotOptions
    ): ConstantWeight => {
        const data = snapshot.data(options) as ConstantWeightDBModel;
        return new ConstantWeight(
            data.issueThreshold,
            data.latenessWeight,
            data.absenceWeight,
            data.attitudeWeight,
            data.scoreIssueWeight,
            data.consultationWeight
        );
    }

}
