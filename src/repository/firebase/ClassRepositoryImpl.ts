import ClassRepository from "../interface/ClassRepository";
import Class from "../../model/Class";
import ClassId from "../../model/identifier/ClassId";
import ClassWeekId from "../../model/identifier/ClassWeekId";
import StudentId from "../../model/identifier/StudentId";

export default class ClassRepositoryImpl implements ClassRepository {
    create(t: Class): Promise<Class> {
        return Promise.resolve(undefined);
    }

    delete(id: ClassId): Promise<boolean> {
        return Promise.resolve(false);
    }

    get(id: ClassId): Promise<Class | null> {
        return Promise.resolve(undefined);
    }

    getAll(): Promise<Array<Class>> {
        return Promise.resolve(undefined);
    }

    pushClassWeekList(id: ClassId, classWeekId: ClassWeekId): Promise<boolean> {
        return Promise.resolve(false);
    }

    pushStudentList(id: ClassId, studentId: StudentId): Promise<boolean> {
        return Promise.resolve(false);
    }

    removeClassWeekList(id: ClassId, classWeekId: ClassWeekId): Promise<boolean> {
        return Promise.resolve(false);
    }

    removeStudentList(id: ClassId, studentId: StudentId): Promise<boolean> {
        return Promise.resolve(false);
    }

    update(t: Class): Promise<boolean> {
        return Promise.resolve(false);
    }

}
