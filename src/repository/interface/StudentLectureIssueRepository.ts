import StudentLectureIssue from "../../model/StudentLectureIssue";
import ClassId from "../../model/identifier/ClassId";
import StudentLectureIssueId from "../../model/identifier/StudentLectureIssueId";

export default interface StudentLectureIssueRepository {
    get(classId: ClassId, studentLectureIssueId: StudentLectureIssueId): Promise<StudentLectureIssue | null>;
    getAll(classId: ClassId): Promise<Array<StudentLectureIssue>>;
    update(classId: ClassId, studentLectureIssue: StudentLectureIssue): Promise<boolean>;
}
