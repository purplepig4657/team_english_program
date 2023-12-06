import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

import StudentId from "./identifier/StudentId";
import StudentLectureIssueId from "./identifier/StudentLectureIssueId";
import LectureId from "./identifier/LectureId";
import ClassId from "./identifier/ClassId";

export default class StudentLectureIssue {
    private readonly _id: StudentLectureIssueId;
    private readonly _classId: ClassId;  // foreign key
    private readonly _lectureId: LectureId;
    private readonly _studentId: StudentId;
    private _lateness: boolean;
    private _absence: boolean;
    private _attitude: boolean;
    private _scoreIssue: boolean;
    private _latenessComment: string | null;
    private _absenceComment: string | null;
    private _attitudeComment: string | null;
    private _scoreIssueComment: string | null;
    private _goodComment: string | null;

    constructor(
        id: StudentLectureIssueId,
        classId: ClassId,
        lectureId: LectureId,
        studentId: StudentId,
        lateness: boolean,
        absence: boolean,
        attitude: boolean,
        scoreIssue: boolean,
        latenessComment: string | null,
        absenceComment: string | null,
        attitudeComment: string | null,
        scoreIssueComment: string | null,
        goodComment: string | null,
    ) {
        this._id = id;
        this._classId = classId;
        this._lectureId = lectureId;
        this._studentId = studentId;
        this._lateness = lateness;
        this._absence = absence;
        this._attitude = attitude;
        this._scoreIssue = scoreIssue;
        this._latenessComment = latenessComment;
        this._absenceComment = absenceComment;
        this._attitudeComment = attitudeComment;
        this._scoreIssueComment = scoreIssueComment;
        this._goodComment = goodComment;
    }

    public switchLateness(): void {
        this._lateness = !this._lateness;
    }

    public switchAbsence(): void {
        this._absence = !this._absence;
    }

    public switchAttitude(): void {
        this._attitude = !this._attitude;
    }

    public switchScoreIssue(): void {
        this._scoreIssue = !this._scoreIssue;
    }

    public setLatenessComment(content: string | null): void {
        this._latenessComment = content;
    }

    public setAbsenceComment(content: string | null): void {
        this._absenceComment = content;
    }

    public setAttitudeComment(content: string | null): void {
        this._attitudeComment = content;
    }

    public setScoreIssueComment(content: string | null): void {
        this._scoreIssueComment = content;
    }

    public setGoodComment(content: string | null): void {
        this._goodComment = content;
    }

    // Getter

    get id(): StudentLectureIssueId {
        return this._id;
    }

    get idString(): string {
        return this._id.id;
    }

    get classId(): ClassId {
        return this._classId;
    }

    get lectureId(): LectureId {
        return this._lectureId;
    }

    get studentId(): StudentId {
        return this._studentId;
    }

    get lateness(): boolean {
        return this._lateness;
    }

    get absence(): boolean {
        return this._absence;
    }

    get attitude(): boolean {
        return this._attitude;
    }

    get scoreIssue(): boolean {
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

    get goodComment(): string | null {
        return this._goodComment;
    }
}


interface StudentLectureIssueDBModel extends DocumentData {
    classId: string;
    lectureId: string;
    studentId: string;
    lateness: boolean;
    absence: boolean;
    attitude: boolean;
    scoreIssue: boolean;
    latenessComment: string | null;
    absenceComment: string | null;
    attitudeComment: string | null;
    scoreIssueComment: string | null;
    goodComment: string | null;
}

export const studentLectureIssueConverter: FirestoreDataConverter<StudentLectureIssue, StudentLectureIssueDBModel> = {
    toFirestore: (studentLectureIssueData: StudentLectureIssue): StudentLectureIssueDBModel => {
        return {
            classId: studentLectureIssueData.classId.id,
            lectureId: studentLectureIssueData.lectureId.id,
            studentId: studentLectureIssueData.studentId.id,
            lateness: studentLectureIssueData.lateness,
            absence: studentLectureIssueData.absence,
            attitude: studentLectureIssueData.attitude,
            scoreIssue: studentLectureIssueData.scoreIssue,
            latenessComment: studentLectureIssueData.latenessComment,
            absenceComment: studentLectureIssueData.absenceComment,
            attitudeComment: studentLectureIssueData.attitudeComment,
            scoreIssueComment: studentLectureIssueData.scoreIssueComment,
            goodComment: studentLectureIssueData.goodComment,
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<StudentLectureIssueDBModel, StudentLectureIssueDBModel>,
        options?: SnapshotOptions
    ): StudentLectureIssue => {
        const data = snapshot.data(options);
        return new StudentLectureIssue(
            new StudentLectureIssueId(snapshot.id),
            new ClassId(data.classId),
            new LectureId(data.lectureId),
            new StudentId(data.studentId),
            data.lateness,
            data.absence,
            data.attitude,
            data.scoreIssue,
            data.latenessComment,
            data.absenceComment,
            data.attitudeComment,
            data.scoreIssueComment,
            data.goodComment,
        );
    },
};
