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
    private _classNameList: Array<string>;
    private _name: string;
    private _englishName: string;
    private readonly _createdAt: Date;
    private _updatedAt: Date;
    private _tuitionDate: Date;
    
    constructor(
        id: StudentId, 
        classIdList: Array<ClassId>,
        classNameList: Array<string>,
        name: string,
        englishName: string,
        createdAt: Date,
        updatedAt: Date,
        tuitionDate: Date
    ) {
        this._id = id;
        this._classIdList = classIdList;
        this._classNameList = classNameList;
        this._name = name;
        this._englishName = englishName;
        this._createdAt = createdAt
        this._updatedAt = updatedAt;
        this._tuitionDate = tuitionDate;
    }

    public getClassIdListString(): string {
        const classIdStringList = this.classIdList.map((id: ClassId) => id.id);
        return classIdStringList.join(', ');
    }

    public getClassNameListString(): string {
        return this.classNameList.join(', ');
    }

    public changeName(newName: string) {
        this._name = newName;
    }

    public changeEnglishName(newEnglishName: string) {
        this._englishName = newEnglishName;
    }

    public changeClassIdList(newClassIdList: Array<ClassId>) {
        this._classIdList = newClassIdList;
    }

    public changeClassNameList(newClassNameList: Array<string>) {
        this._classNameList = newClassNameList;
    }

    public changeUpdatedAt(date?: Date | undefined) {
        if (date === undefined) this._updatedAt = new Date();
        else this._updatedAt = date;
    }

    public changeTuitionDate(date: Date) {
        this._tuitionDate = date;
    }

    public isTuitionIssueStudent(): boolean {
        const currentDate = new Date();
        const comparableTuitionDate = new Date(
            currentDate.getFullYear(),
            this.tuitionDate.getMonth(),
            this.tuitionDate.getDate()
        );

        const tenDaysAgo = new Date(currentDate);
        tenDaysAgo.setDate(currentDate.getDate() - 10);

        return comparableTuitionDate >= tenDaysAgo && comparableTuitionDate <= currentDate;
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

    get classNameList(): Array<string> {
        return this._classNameList;
    }

    get name(): string {
        return this._name;
    }

    get englishName(): string {
        return this._englishName;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    get tuitionDate(): Date {
        return this._tuitionDate;
    }

}

interface StudentDBModel extends DocumentData {
    classIdList: Array<string>;
    classNameList: Array<string>;
    name: string;
    englishName: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    tuitionDate: Timestamp;
}

export const studentConverter: FirestoreDataConverter<Student, StudentDBModel> = {
    toFirestore: (student: Student): StudentDBModel => {
        return {
            classIdList: student.classIdList.map((classId: ClassId) => classId.id),
            classNameList: student.classNameList,
            name: student.name,
            englishName: student.englishName,
            createdAt: Timestamp.fromDate(student.createdAt),
            updatedAt: Timestamp.fromDate(student.updatedAt),
            tuitionDate: Timestamp.fromDate(student.tuitionDate),
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
            data.classNameList,
            data.name,
            data.englishName,
            data.createdAt.toDate(),
            data.updatedAt.toDate(),
            data.tuitionDate.toDate(),
        );
    },
};
