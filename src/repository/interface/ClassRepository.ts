import Class from "../../model/Class";
import ClassId from "../../model/identifier/ClassId";
import CRUDBase from "./base/CRUDBase";
import StudentId from "../../model/identifier/StudentId";
import StudentLectureIssue from "../../model/StudentLectureIssue";
import StudentLectureIssueId from "../../model/identifier/StudentLectureIssueId";
import Lecture from "../../model/Lecture";
import LectureId from "../../model/identifier/LectureId";

export default interface ClassRepository extends CRUDBase<Class, ClassId> {
    getAll(): Promise<Array<Class>>;
    addStudentId(id: ClassId, studentId: StudentId): Promise<boolean>;
    removeStudentId(id: ClassId, studentId: StudentId): Promise<boolean>;
    addStudentLectureIssue(id: ClassId, studentLectureIssue: StudentLectureIssue): Promise<StudentLectureIssue>;
    removeStudentLectureIssue(id: ClassId, studentLectureIssueId: StudentLectureIssueId): Promise<boolean>;
    addLecture(id: ClassId, lecture: Lecture): Promise<Lecture>;
    removeLecture(id: ClassId, lectureId: LectureId): Promise<boolean>;
}
