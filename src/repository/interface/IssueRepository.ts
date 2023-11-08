import CRUDBase from "./base/CRUDBase";
import Issue from "../../model/Issue";
import IssueId from "../../model/identifier/IssueId";

export default interface IssueRepository extends CRUDBase<Issue, IssueId>{
    
}
