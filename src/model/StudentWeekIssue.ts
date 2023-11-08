import firebase from "firebase/compat";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import SnapshotOptions = firebase.firestore.SnapshotOptions;

import Issue from "./Issue";
import StudentWeekIssueId from "./identifier/StudentWeekIssueId";
import WeekId from "./identifier/WeekId";

export default class StudentWeekIssue extends Issue {
    private readonly _id: StudentWeekIssueId;
    private readonly _weekId: WeekId;

    constructor(
        id: StudentWeekIssueId,
        weekId: WeekId,
        lateness: number,
        absence: number,
        attitude: number,
        scoreIssue: number,
        latenessComment: string | null,
        absenceComment: string | null,
        attitudeComment: string | null,
        scoreIssueComment: string | null
    ) {
        super(lateness, absence, attitude, scoreIssue, latenessComment, absenceComment, attitudeComment, scoreIssueComment);
        this._id = id;
        this._weekId = weekId;
    }

    // Getter

    get idObject(): StudentWeekIssueId {
        return this._id;
    }

    get id(): string {
        return this._id.id;
    }

    get weekId(): WeekId {
        return this._weekId;
    }

}

export const studentWeekIssueConverter = {
    toFirestore: (studentWeekIssueData: StudentWeekIssue) => {
        return {
            id: studentWeekIssueData.id,
            weekId: studentWeekIssueData.weekId,
            lateness: studentWeekIssueData.lateness,
            absence: studentWeekIssueData.absence,
            attitude: studentWeekIssueData.attitude,
            scoreIssue: studentWeekIssueData.scoreIssue,
            latenessComment: studentWeekIssueData.latenessComment,
            absenceComment: studentWeekIssueData.absenceComment,
            attitudeComment: studentWeekIssueData.attitudeComment,
            scoreIssueComment: studentWeekIssueData.scoreIssueComment
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new StudentWeekIssue(
            data.id,
            data.weekId,
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
