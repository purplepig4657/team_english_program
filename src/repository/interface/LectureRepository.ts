import CRUDBase from "./base/CRUDBase";
import Lecture from "../../model/Lecture";
import LectureId from "../../model/identifier/LectureId";
import StudentLectureIssueId from "../../model/identifier/StudentLectureIssueId";

export default interface LectureRepository extends CRUDBase<Lecture, LectureId>{
    getAll(): Promise<Array<Lecture>>;
    pushStudentLectureIssueList(id: LectureId, studentLectureIssueId: StudentLectureIssueId): Promise<boolean>;
    removeStudentLectureIssueList(id: LectureId, studentLectureIssueId: StudentLectureIssueId): Promise<boolean>;

}
