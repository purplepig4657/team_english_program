import firebase from "firebase/compat";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import SnapshotOptions = firebase.firestore.SnapshotOptions;

import LectureId from "./identifier/LectureId";
import StudentLectureIssueId from "./identifier/StudentLectureIssueId";

export default class Lecture {
    private _id: LectureId;
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

export const lectureConverter = {
    toFirestore: (lectureData: Lecture) => {
        return {
            id: lectureData.id,
            name: lectureData.name,
            teacherName: lectureData.teacherName,
            studentLectureIssueIdList: lectureData.studentLectureIssueIdList,
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new Lecture(
            data.id,
            data.name,
            data.teacherName,
            data.studentLectureIssueIdList
        );
    }
}
