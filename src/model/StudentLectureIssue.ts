import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

import Issue from "./Issue";
import StudentId from "./identifier/StudentId";
import StudentLectureIssueId from "./identifier/StudentLectureIssueId";

export default class StudentLectureIssue extends Issue {
    private readonly _id: StudentLectureIssueId;
    private readonly _studentId: StudentId;

    constructor(
        id: StudentLectureIssueId,
        studentId: StudentId,
        lateness: number,
        absence: number,
        attitude: number,
        scoreIssue: number,
        latenessComment: string | null,
        absenceComment: string | null,
        attitudeComment: string | null,
        scoreIssueComment: string | null
    ) {
        super(
            lateness, 
            absence, 
            attitude, 
            scoreIssue, 
            latenessComment, 
            absenceComment, 
            attitudeComment, 
            scoreIssueComment
        );
        this._id = id;
        this._studentId = studentId;
    }

    // Getter

    get idObject(): StudentLectureIssueId {
        return this._id;
    }

    get id(): string {
        return this._id.id;
    }

    get studentId(): StudentId {
        return this._studentId;
    }
}

interface StudentLectureIssueDBModel extends DocumentData {
    studentId: string;
    lateness: number;
    absence: number;
    attitude: number;
    scoreIssue: number;
    latenessComment: string | null;
    absenceComment: string | null;
    attitudeComment: string | null;
    scoreIssueComment: string | null;
}

export const studentLectureIssueConverter: FirestoreDataConverter<StudentLectureIssue, StudentLectureIssueDBModel> = {
    toFirestore: (studentLectureIssueData: StudentLectureIssue): StudentLectureIssueDBModel => {
        return {
            studentId: studentLectureIssueData.studentId.id,
            lateness: studentLectureIssueData.lateness,
            absence: studentLectureIssueData.absence,
            attitude: studentLectureIssueData.attitude,
            scoreIssue: studentLectureIssueData.scoreIssue,
            latenessComment: studentLectureIssueData.latenessComment,
            absenceComment: studentLectureIssueData.absenceComment,
            attitudeComment: studentLectureIssueData.attitudeComment,
            scoreIssueComment: studentLectureIssueData.scoreIssueComment
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<StudentLectureIssueDBModel, StudentLectureIssueDBModel>,
        options?: SnapshotOptions
    ): StudentLectureIssue => {
        const data = snapshot.data(options);
        return new StudentLectureIssue(
            new StudentLectureIssueId(snapshot.id),
            new StudentId(data.studentId),
            data.lateness,
            data.absence,
            data.attitude,
            data.scoreIssue,
            data.latenessComment,
            data.absenceComment,
            data.attitudeComment,
            data.scoreIssueComment
        );
    },
};
