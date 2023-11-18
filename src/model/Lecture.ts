import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

import LectureId from "./identifier/LectureId";
import WeekId from "./identifier/WeekId";
import ClassId from "./identifier/ClassId";
import StudentLectureIssue from "./StudentLectureIssue";

export default class Lecture {
    private readonly _id: LectureId;
    private readonly _classId: ClassId;  // foreign key
    private readonly _weekId: WeekId;
    private _name: string;
    private _teacherName: string;

    constructor(
        id: LectureId,
        classId: ClassId,
        weekId: WeekId,
        name: string,
        teacherName: string
    ) {
        this._id = id;
        this._classId = classId;
        this._weekId = weekId;
        this._name = name;
        this._teacherName = teacherName;
    }

    // Getter

    get id(): LectureId {
        return this._id;
    }

    get idString(): string {
        return this._id.id;
    }

    get classId(): ClassId {
        return this._classId;
    }

    get weekId(): WeekId {
        return this._weekId;
    }

    get name(): string {
        return this._name;
    }

    get teacherName(): string {
        return this._teacherName;
    }

}

interface LectureDBModel extends DocumentData {
    classId: string;
    weekId: string;
    name: string;
    teacherName: string;
}

export const lectureConverter: FirestoreDataConverter<Lecture, LectureDBModel> = {
    toFirestore: (lecture: Lecture): LectureDBModel => {


        return {
            classId: lecture.classId.id,
            weekId: lecture.weekId.id,
            name: lecture.name,
            teacherName: lecture.teacherName,

        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<LectureDBModel, LectureDBModel>,
        options?: SnapshotOptions
    ): Lecture => {
        const data = snapshot.data(options) as LectureDBModel;

        return new Lecture(
            new LectureId(snapshot.id),
            new ClassId(data.classId),
            new WeekId(data.weekId),
            data.name,
            data.teacherName
        );
    },
};
