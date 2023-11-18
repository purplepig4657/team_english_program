import {
    DocumentData, FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

import ClassId from "./identifier/ClassId";
import StudentId from "./identifier/StudentId";

export default class Class {
    private _id: ClassId;  // Same with class name.
    private _studentIdList: Array<StudentId>;

    public constructor(id: ClassId, studentIdList: Array<StudentId>) {
        this._id = id;
        this._studentIdList = studentIdList;
    }
    
    // Getter

    get id(): ClassId {
        return this._id;
    }
    
    get idString(): string {
        return this._id.id;
    }

    get studentIdList(): Array<StudentId> {
        return this._studentIdList;
    }
}


interface ClassDBModel extends DocumentData {
    id: string;
    studentIdList: Array<string>;
}

export const classConverter: FirestoreDataConverter<Class, ClassDBModel> = {
    toFirestore: (classData: Class): ClassDBModel => {
        const studentIdStringList: Array<string> =
            classData.studentIdList.map((studentId: StudentId) => studentId.id);

        return {
            id: classData.idString,
            studentIdList: studentIdStringList
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<ClassDBModel, ClassDBModel>,
        options?: SnapshotOptions
    ): Class => {
        const data = snapshot.data(options) as ClassDBModel;

        const studentIdList: Array<StudentId> =
            data.studentIdList.map((studentIdString: string) => new StudentId(studentIdString));

        return new Class(
            new ClassId(snapshot.id),
            studentIdList
        );
    }

}
