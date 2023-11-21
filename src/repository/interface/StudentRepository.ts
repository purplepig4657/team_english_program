import CRUDBase from "./base/CRUDBase";
import Student from "../../model/Student";
import StudentId from "../../model/identifier/StudentId";
import ClassId from "../../model/identifier/ClassId";
import StudentWeekIssueId from "../../model/identifier/StudentWeekIssueId";
import TuitionPaymentId from "../../model/identifier/TuitionPaymentId";
import StudentWeekIssue from "../../model/StudentWeekIssue";
import TuitionPayment from "../../model/TuitionPayment";

export default interface StudentRepository extends CRUDBase<Student, StudentId> {
    getLastCreatedStudent(): Promise<Student>;
    getAllByIdList(idList: Array<StudentId>): Promise<Array<Student>>;
    getAllByClassId(classId: ClassId): Promise<Array<Student>>;
    getAll(): Promise<Array<Student>>;
    addClassId(id: StudentId, classId: ClassId): Promise<boolean>;
    removeClassId(id: StudentId, classId: ClassId): Promise<boolean>;
    addStudentWeekIssue(id: StudentId, studentWeekIssue: StudentWeekIssue): Promise<boolean>;
    removeStudentWeekIssue(id: StudentId, studentWeekIssueId: StudentWeekIssueId): Promise<boolean>;
    addTuitionPayment(id: StudentId, tuitionPayment: TuitionPayment): Promise<boolean>;
    removeTuitionPayment(id: StudentId, tuitionPaymentId: TuitionPaymentId): Promise<boolean>;

}
