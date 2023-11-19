import CRUDBase from "./base/CRUDBase";
import StudentIssue from "../../model/StudentIssue";
import StudentIssueId from "../../model/identifier/StudentIssueId";

export default interface StudentIssueRepository extends CRUDBase<StudentIssue, StudentIssueId> {
    getAll(): Promise<Array<StudentIssue>>;
}
