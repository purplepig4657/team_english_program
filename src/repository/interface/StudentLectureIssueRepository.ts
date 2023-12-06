import StudentLectureIssue from "../../model/StudentLectureIssue";
import ClassId from "../../model/identifier/ClassId";
import StudentLectureIssueId from "../../model/identifier/StudentLectureIssueId";
import LectureId from "../../model/identifier/LectureId";
import StudentId from "../../model/identifier/StudentId";

export default interface StudentLectureIssueRepository {
    get(classId: ClassId, studentLectureIssueId: StudentLectureIssueId): Promise<StudentLectureIssue | null>;
    getAll(classId: ClassId): Promise<Array<StudentLectureIssue>>;
    getAllByLectureId(classId: ClassId, lectureId: LectureId): Promise<Array<StudentLectureIssue>>;
    getAllByLectureIdAndStudentId(
        classId: ClassId,
        lectureId: LectureId,
        studentId: StudentId
    ): Promise<Array<StudentLectureIssue>>;
    update(classId: ClassId, studentLectureIssue: StudentLectureIssue): Promise<boolean>;
}
