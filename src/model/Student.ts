import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions, Timestamp
} from "firebase/firestore";

import ClassId from "./identifier/ClassId";
import StudentId from "./identifier/StudentId";

export default class Student {
    private readonly _id: StudentId;
    private _classIdList: Array<ClassId>;
    private _name: string;
    private _createdAt: Date;
    
    constructor(
        id: StudentId, 
        classIdList: Array<ClassId>, 
        name: string,
        createdAt: Date
    ) {
        this._id = id;
        this._classIdList = classIdList;
        this._name = name;
        this._createdAt = createdAt;
    }

    public getClassIdListString(): string {
        const classIdStringList = this.classIdList.map((id: ClassId) => id.id);
        return classIdStringList.join(', ')
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

    get createdAt(): Date {
        return this._createdAt;
    }

}

interface StudentDBModel extends DocumentData {
    classIdList: Array<string>;
    name: string;
    createdAt: Timestamp;
}

export const studentConverter: FirestoreDataConverter<Student, StudentDBModel> = {
    toFirestore: (student: Student): StudentDBModel => {
        return {
            classIdList: student.classIdList.map((classId: ClassId) => classId.id),
            name: student.name,
            createdAt: Timestamp.fromDate(student.createdAt)
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
            data.name,
            data.createdAt.toDate()
        );
    },
};
