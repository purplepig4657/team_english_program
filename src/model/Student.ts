import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

import ClassId from "./identifier/ClassId";
import StudentId from "./identifier/StudentId";

export default class Student {
    private readonly _id: StudentId;
    private _classIdList: Array<ClassId>;
    private _name: string;
    
    constructor(
        id: StudentId, 
        classIdList: Array<ClassId>, 
        name: string
    ) {
        this._id = id;
        this._classIdList = classIdList;
        this._name = name;
    }

    // Getter

    get id(): StudentId {
        return this._id;
    }

    get idString(): string {
        return this._id.id;
    }

    get classIdList(): Array<ClassId> {
        return this._classIdList;
    }

    get name(): string {
        return this._name;
    }

}

interface StudentDBModel extends DocumentData {
    classIdList: Array<string>;
    name: string;
}

export const studentConverter: FirestoreDataConverter<Student, StudentDBModel> = {
    toFirestore: (student: Student): StudentDBModel => {
        return {
            classIdList: student.classIdList.map((classId: ClassId) => classId.id),
            name: student.name
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<StudentDBModel, StudentDBModel>,
        options?: SnapshotOptions
    ): Student => {
        const data = snapshot.data(options) as StudentDBModel;
        const classIdList: Array<ClassId> = data.classIdList.map((classIdString: string) => new ClassId(classIdString));

        return new Student(
            new StudentId(snapshot.id),
            classIdList,
            data.name
        );
    },
};
