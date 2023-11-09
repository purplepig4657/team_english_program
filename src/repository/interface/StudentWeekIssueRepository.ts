import CRUDBase from "./base/CRUDBase";
import StudentWeekIssue from "../../model/StudentWeekIssue";
import StudentWeekIssueId from "../../model/identifier/StudentWeekIssueId";

export default interface StudentWeekIssueRepository extends CRUDBase<StudentWeekIssue, StudentWeekIssueId>{
    getAll(): Promise<Array<StudentWeekIssue>>;

}
