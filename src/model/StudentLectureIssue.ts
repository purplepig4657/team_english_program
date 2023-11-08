import firebase from "firebase/compat";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import SnapshotOptions = firebase.firestore.SnapshotOptions;

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

export const studentLectureIssueConverter = {
    toFirestore: (studentLectureIssueData: StudentLectureIssue) => {
        return {
            id: studentLectureIssueData.id,
            studentId: studentLectureIssueData.studentId,
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
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new StudentLectureIssue(
            data.id,
            data.studentId,
            data.lateness,
            data.absence,
            data.attitude,
            data.scoreIssue,
            data.latenessComment,
            data.absenceComment,
            data.attitudeComment,
            data.scoreIssueComment
        );
    }
}
