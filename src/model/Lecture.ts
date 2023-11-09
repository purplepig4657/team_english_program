import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

import LectureId from "./identifier/LectureId";
import StudentLectureIssueId from "./identifier/StudentLectureIssueId";

export default class Lecture {
    private readonly _id: LectureId;
    private _name: string;
    private _teacherName: string;
    private _studentLectureIssueIdList: Array<StudentLectureIssueId>;

    constructor(id: LectureId, name: string, teacherName: string, studentLectureIssueIdList: Array<StudentLectureIssueId>) {
        this._id = id;
        this._name = name;
        this._teacherName = teacherName;
        this._studentLectureIssueIdList = studentLectureIssueIdList;
    }

    // Getter

    get idObject(): LectureId {
        return this._id;
    }

    get id(): string {
        return this._id.id;
    }

    get name(): string {
        return this._name;
    }

    get teacherName(): string {
        return this._teacherName;
    }

    get studentLectureIssueIdList(): Array<StudentLectureIssueId> {
        return this._studentLectureIssueIdList;
    }
}

interface LectureDBModel extends DocumentData {
    name: string;
    teacherName: string;
    studentLectureIssueIdList: Array<string>;
}

export const lectureConverter: FirestoreDataConverter<Lecture, LectureDBModel> = {
    toFirestore: (lecture: Lecture): LectureDBModel => {
        const studentLectureIssueIdStringList: Array<string> = lecture.studentLectureIssueIdList.map(
            (studentLectureIssueId: StudentLectureIssueId) => studentLectureIssueId.id
        );

        return {
            name: lecture.name,
            teacherName: lecture.teacherName,
            studentLectureIssueIdList: studentLectureIssueIdStringList,
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<LectureDBModel, LectureDBModel>,
        options?: SnapshotOptions
    ): Lecture => {
        const data = snapshot.data(options) as LectureDBModel;

        const studentLectureIssueIdList: Array<StudentLectureIssueId> = data.studentLectureIssueIdList.map(
            (studentLectureIssueIdString: string) => new StudentLectureIssueId(studentLectureIssueIdString)
        );

        return new Lecture(
            new LectureId(data.id),
            data.name,
            data.teacherName,
            studentLectureIssueIdList
        );
    },
};
