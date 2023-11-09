import {
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

export default class Issue {
    private _lateness: number;
    private _absence: number;
    private _attitude: number;
    private _scoreIssue: number;
    private _latenessComment: string | null;
    private _absenceComment: string | null;
    private _attitudeComment: string | null;
    private _scoreIssueComment: string | null;

    constructor(
        lateness: number,
        absence: number,
        attitude: number,
        scoreIssue: number,
        latenessComment: string | null,
        absenceComment: string | null,
        attitudeComment: string | null,
        scoreIssueComment: string | null
    ) {
        this._lateness = lateness;
        this._absence = absence;
        this._attitude = attitude;
        this._scoreIssue = scoreIssue;
        this._latenessComment = latenessComment;
        this._absenceComment = absenceComment;
        this._attitudeComment = attitudeComment;
        this._scoreIssueComment = scoreIssueComment;
    }

    // Getter

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

    get latenessComment(): string | null {
        return this._latenessComment;
    }

    get absenceComment(): string | null {
        return this._absenceComment;
    }

    get attitudeComment(): string | null {
        return this._attitudeComment;
    }

    get scoreIssueComment(): string | null {
        return this._scoreIssueComment;
    }
}
