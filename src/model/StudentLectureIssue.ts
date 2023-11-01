import Issue from "./Issue";
import StudentId from "./identifier/StudentId";
import StudentLectureIssueId from "./identifier/StudentLectureIssueId";

export default class StudentLectureIssue extends Issue {
    private _id: StudentLectureIssueId;
    private _studentId: StudentId;

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
