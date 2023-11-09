import Class from "../../model/Class";
import ClassId from "../../model/identifier/ClassId";
import CRUDBase from "./base/CRUDBase";
import ClassWeekId from "../../model/identifier/ClassWeekId";
import StudentId from "../../model/identifier/StudentId";

export default interface ClassRepository extends CRUDBase<Class, ClassId> {
    getAll(): Promise<Array<Class>>;
    pushClassWeekList(id: ClassId, classWeekId: ClassWeekId): Promise<boolean>;
    removeClassWeekList(id: ClassId, classWeekId: ClassWeekId): Promise<boolean>;
    pushStudentList(id: ClassId, studentId: StudentId): Promise<boolean>;
    removeStudentList(id: ClassId, studentId: StudentId): Promise<boolean>;

}
