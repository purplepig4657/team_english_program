import {
    DocumentData, FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

import ClassId from "./identifier/ClassId";
import ClassWeekId from "./identifier/ClassWeekId";
import StudentId from "./identifier/StudentId";

export default class Class {
    private _id: ClassId;  // Same with class name.
    private _classWeekIdList: Array<ClassWeekId>;
    private _studentIdList: Array<StudentId>;

    public constructor(id: ClassId, classWeekIdList: Array<ClassWeekId>, studentIdList: Array<StudentId>) {
        this._id = id;
        this._classWeekIdList = classWeekIdList;
        this._studentIdList = studentIdList;
    }
    
    // Getter

    get idObject(): ClassId {
        return this._id;
    }
    
    get id(): string {
        return this._id.id;
    }

    get classWeekIdList(): Array<ClassWeekId> {
        return this._classWeekIdList;
    }

    get studentIdList(): Array<StudentId> {
        return this._studentIdList;
    }
}


interface ClassDBModel extends DocumentData {
    id: string;
    classWeekIdList: Array<string>;
    studentIdList: Array<string>;
}

export const classConverter: FirestoreDataConverter<Class, ClassDBModel> = {
    toFirestore: (classData: Class): ClassDBModel => {
        const classWeekIdStringList: Array<string> =
            classData.classWeekIdList.map((classWeekId: ClassWeekId) => classWeekId.id);
        const studentIdStringList: Array<string> =
            classData.studentIdList.map((studentId: StudentId) => studentId.id);

        return {
            id: classData.id,
            classWeekIdList: classWeekIdStringList,
            studentIdList: studentIdStringList
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<ClassDBModel, ClassDBModel>,
        options?: SnapshotOptions
    ): Class => {
        const data = snapshot.data(options) as ClassDBModel;

        const classWeekIdList: Array<ClassWeekId> =
            data.classWeekIdList.map((classWeekIdString: string) => new ClassWeekId(classWeekIdString))
        const studentIdList: Array<StudentId> =
            data.studentIdList.map((studentIdString: string) => new StudentId(studentIdString))

        return new Class(
            new ClassId(snapshot.id),
            classWeekIdList,
            studentIdList
        );
    }

}
