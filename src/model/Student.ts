import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

import ClassId from "./identifier/ClassId";
import StudentId from "./identifier/StudentId";
import StudentWeekIssueId from "./identifier/StudentWeekIssueId";
import TuitionPaymentId from "./identifier/TuitionPaymentId";

export default class Student {
    private readonly _id: StudentId;
    private _classIdList: Array<ClassId>;
    private _name: string;
    private _studentWeekIssueIdList: Array<StudentWeekIssueId>;
    private _tuitionPaymentIdList: Array<TuitionPaymentId>;
    
    constructor(
        id: StudentId, 
        classIdList: Array<ClassId>, 
        name: string, 
        studentWeekIssueIdList: Array<StudentWeekIssueId>, 
        tuitionPaymentIdList: Array<TuitionPaymentId>
    ) {
        this._id = id;
        this._classIdList = classIdList;
        this._name = name;
        this._studentWeekIssueIdList = studentWeekIssueIdList;
        this._tuitionPaymentIdList = tuitionPaymentIdList;
    }

    // Getter

    get idObject(): StudentId {
        return this._id;
    }

    get id(): string {
        return this._id.id;
    }

    get classIdList(): Array<ClassId> {
        return this._classIdList;
    }

    get name(): string {
        return this._name;
    }

    get studentWeekIssueIdList(): Array<StudentWeekIssueId> {
        return this._studentWeekIssueIdList;
    }

    get tuitionPaymentIdList(): Array<TuitionPaymentId> {
        return this._tuitionPaymentIdList;
    }
}

interface StudentDBModel extends DocumentData {
    classIdList: Array<string>;
    name: string;
    studentWeekIssueIdList: Array<string>;
    tuitionPaymentIdList: Array<string>;
}

export const studentConverter: FirestoreDataConverter<Student, StudentDBModel> = {
    toFirestore: (student: Student): StudentDBModel => {
        return {
            classIdList: student.classIdList.map((classId: ClassId) => classId.id),
            name: student.name,
            studentWeekIssueIdList:
                student.studentWeekIssueIdList.map((studentWeekIssueId: StudentWeekIssueId) => studentWeekIssueId.id),
            tuitionPaymentIdList:
                student.tuitionPaymentIdList.map((tuitionPaymentId: TuitionPaymentId) => tuitionPaymentId.id),
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<StudentDBModel, StudentDBModel>,
        options?: SnapshotOptions
    ): Student => {
        const data = snapshot.data(options) as StudentDBModel;

        const classIdList: Array<ClassId> = data.classIdList.map((classIdString: string) => new ClassId(classIdString));
        const studentWeekIssueIdList: Array<StudentWeekIssueId> = data.studentWeekIssueIdList.map(
            (studentWeekIssueIdString: string) => new StudentWeekIssueId(studentWeekIssueIdString)
        );
        const tuitionPaymentIdList: Array<TuitionPaymentId> = data.tuitionPaymentIdList.map(
            (tuitionPaymentIdString: string) => new TuitionPaymentId(tuitionPaymentIdString)
        );

        return new Student(
            new StudentId(snapshot.id),
            classIdList,
            data.name,
            studentWeekIssueIdList,
            tuitionPaymentIdList
        );
    },
};
