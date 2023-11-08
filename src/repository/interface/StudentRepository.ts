import CRUDBase from "./base/CRUDBase";
import Student from "../../model/Student";
import StudentId from "../../model/identifier/StudentId";

export default interface StudentRepository extends CRUDBase<Student, StudentId> {
    
}
