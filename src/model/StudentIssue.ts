import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    Timestamp
} from "firebase/firestore";

import StudentIssueId from "./identifier/StudentIssueId";
import StudentId from "./identifier/StudentId";
import {
    ABSENCE_WEIGHT,
    ATTITUDE_WEIGHT, CONSULTATION_WEIGHT,
    ISSUE_THRESHOLD,
    LATENESS_WEIGHT,
    SCORE_ISSUE_WEIGHT
} from "../constants/GlobalWeight";

export default class StudentIssue {
    private readonly _id: StudentIssueId;
    private readonly _studentId: StudentId;  // foreign key
    private _lateness: number;
    private _absence: number;
    private _attitude: number;
    private _scoreIssue: number;
    private _consultation: number;
    private _updatedAt: Date;

    constructor(
        id: StudentIssueId,
        studentId: StudentId,
        lateness: number,
        absence: number,
        attitude: number,
        scoreIssue: number,
        consultation: number,
        updatedAt: Date
    ) {
        this._id = id;
        this._studentId = studentId;
        this._lateness = lateness;
        this._absence = absence;
        this._attitude = attitude;
        this._scoreIssue = scoreIssue;
        this._consultation = consultation;
        this._updatedAt = updatedAt;
    }

    public isIssueStudent(): boolean {
        return this.getIssueScore() >= ISSUE_THRESHOLD;
    }

    public getIssueScore(): number {
        return Math.max(
            (this.lateness * LATENESS_WEIGHT) +
            (this.absence * ABSENCE_WEIGHT) +
            (this.attitude * ATTITUDE_WEIGHT) +
            (this.scoreIssue * SCORE_ISSUE_WEIGHT) -
            (this.consultation * CONSULTATION_WEIGHT), 0);
    }

    public incrementLateness(): void {
        this._lateness += 1;
    }

    public decrementLateness(): void {
        this._lateness -= 1;
    }

    public incrementAbsence(): void {
        this._absence += 1;
    }

    public decrementAbsence(): void {
        this._absence -= 1;
    }

    public incrementAttitude(): void {
        this._attitude += 1;
    }

    public decrementAttitude(): void {
        this._attitude -= 1;
    }

    public incrementScoreIssue(): void {
        this._scoreIssue += 1;
    }

    public decrementScoreIssue(): void {
        this._scoreIssue -= 1;
    }

    public incrementConsultation(): void {
        this._consultation += 1;
    }

    public decrementConsultation(): void {
        if (this._consultation == 0) return;
        this._consultation -= 1;
    }

    get id(): StudentId {
        return this._id;
    }

    get idString(): string {
        return this._id.id;
    }

    get studentId(): StudentId {
        return this._studentId;
    }

    get lateness(): number {
        return this._lateness;
    }

    get absence(): number {
        return this._absence;
    }

    get attitude(): number {
        return this._attitude;
    }

    get scoreIssue(): number {
        return this._scoreIssue;
    }

    get consultation(): number {
        return this._consultation;
    }

    get updateAt(): Date {
        return this._updatedAt;
    }

}

interface StudentIssueDBModel extends DocumentData {
    studentId: string;
    lateness: number;
    absence: number;
    attitude: number;
    scoreIssue: number;
    consultation: number;
    updatedAt: Timestamp;
}

export const studentIssueConverter: FirestoreDataConverter<StudentIssue, StudentIssueDBModel> = {
    toFirestore(studentIssue: StudentIssue): StudentIssueDBModel {
        return {
            studentId: studentIssue.studentId.id,
            lateness: studentIssue.lateness,
            absence: studentIssue.absence,
            attitude: studentIssue.attitude,
            scoreIssue: studentIssue.scoreIssue,
            consultation: studentIssue.consultation,
            updatedAt: Timestamp.fromDate(studentIssue.updateAt)
        }
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options?: SnapshotOptions
    ): StudentIssue {
        const data = snapshot.data(options) as StudentIssueDBModel;
        return new StudentIssue(
            new StudentIssueId(snapshot.id),
            new StudentId(data.studentId),
            data.lateness,
            data.absence,
            data.attitude,
            data.scoreIssue,
            data.consultation,
            data.updatedAt.toDate()
        );
    }
};
