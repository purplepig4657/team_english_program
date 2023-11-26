import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

import StudentWeekIssueId from "./identifier/StudentWeekIssueId";
import WeekId from "./identifier/WeekId";
import StudentId from "./identifier/StudentId";


export default class StudentWeekIssue {
    private readonly _id: StudentWeekIssueId;  // same with week name.
    private readonly _studentId: StudentId  // foreign key
    private readonly _weekId: WeekId;
    private _lateness: number;
    private _absence: number;
    private _attitude: number;
    private _scoreIssue: number;

    constructor(
        id: StudentWeekIssueId,
        studentId: StudentId,
        weekId: WeekId,
        lateness: number,
        absence: number,
        attitude: number,
        scoreIssue: number,
    ) {
        this._id = id;
        this._studentId = studentId;
        this._weekId = weekId;
        this._lateness = lateness;
        this._absence = absence;
        this._attitude = attitude;
        this._scoreIssue = scoreIssue;
    }

    public getIssueScore(): number {
        // TODO: Revise this.
        return this.lateness + this.absence + this.attitude + this.scoreIssue;
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

    // Getter

    get id(): StudentWeekIssueId {
        return this._id;
    }

    get idString(): string {
        return this._id.id;
    }

    get studentId(): StudentId {
        return this._studentId;
    }

    get weekId(): WeekId {
        return this._weekId;
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
}


interface StudentWeekIssueDBModel extends DocumentData {
    studentId: string;
    weekId: string;
    lateness: number;
    absence: number;
    attitude: number;
    scoreIssue: number;
}

export const studentWeekIssueConverter: FirestoreDataConverter<StudentWeekIssue, StudentWeekIssueDBModel> = {
    toFirestore: (studentWeekIssueData: StudentWeekIssue): StudentWeekIssueDBModel => {
        return {
            studentId: studentWeekIssueData.studentId.id,
            weekId: studentWeekIssueData.weekId.id,
            lateness: studentWeekIssueData.lateness,
            absence: studentWeekIssueData.absence,
            attitude: studentWeekIssueData.attitude,
            scoreIssue: studentWeekIssueData.scoreIssue
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<StudentWeekIssueDBModel, StudentWeekIssueDBModel>,
        options?: SnapshotOptions
    ): StudentWeekIssue => {
        const data = snapshot.data(options);
        return new StudentWeekIssue(
            new StudentWeekIssueId(snapshot.id),
            new StudentId(data.studentId),
            new WeekId(data.weekId),
            data.lateness,
            data.absence,
            data.attitude,
            data.scoreIssue
        );
    },
};
