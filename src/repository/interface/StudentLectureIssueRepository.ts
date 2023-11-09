import CRUDBase from "./base/CRUDBase";
import StudentLectureIssue from "../../model/StudentLectureIssue";
import StudentLectureIssueId from "../../model/identifier/StudentLectureIssueId";

export default interface StudentLectureIssueRepository extends CRUDBase<StudentLectureIssue, StudentLectureIssueId>{
    getAll(): Promise<Array<StudentLectureIssue>>;

}
