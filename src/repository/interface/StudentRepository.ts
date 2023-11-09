import CRUDBase from "./base/CRUDBase";
import Student from "../../model/Student";
import StudentId from "../../model/identifier/StudentId";
import ClassId from "../../model/identifier/ClassId";
import StudentWeekIssueId from "../../model/identifier/StudentWeekIssueId";
import TuitionPaymentId from "../../model/identifier/TuitionPaymentId";

export default interface StudentRepository extends CRUDBase<Student, StudentId> {
    getAll(): Promise<Array<Student>>;
    pushClassList(id: StudentId, classId: ClassId): Promise<boolean>;
    removeClassList(id: StudentId, classId: ClassId): Promise<boolean>;
    pushStudentWeekIssueList(id: StudentId, studentWeekIssueId: StudentWeekIssueId): Promise<boolean>;
    removeStudentWeekIssueList(id: StudentId, studentWeekIssueId: StudentWeekIssueId): Promise<boolean>;
    pushTuitionPaymentList(id: StudentId, tuitionPaymentId: TuitionPaymentId): Promise<boolean>;
    removeTuitionPaymentList(id: StudentId, tuitionPaymentId: TuitionPaymentId): Promise<boolean>;

}
