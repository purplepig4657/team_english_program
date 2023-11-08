import firebase from "firebase/compat";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import SnapshotOptions = firebase.firestore.SnapshotOptions;

import ClassWeekId from "./identifier/ClassWeekId";
import LectureId from "./identifier/LectureId";
import WeekId from "./identifier/WeekId";

export default class ClassWeek {
    private _id: ClassWeekId;
    private _weekId: WeekId;
    private _weekName: string;
    private _lectureIdList: Array<LectureId>;

    public constructor(
        id: ClassWeekId, 
        weekId: WeekId, 
        weekName: string, 
        lectureIdList: Array<LectureId>
    ) {
        this._id = id;
        this._weekId = weekId;
        this._weekName = weekName;
        this._lectureIdList = lectureIdList;
    }

    // Getter

    get idObject(): ClassWeekId {
        return this._id;
    }

    get id(): string {
        return this._id.id;
    }

    get weekId(): WeekId {
        return this._weekId;
    }

    get weekName(): string {
        return this._weekName;
    }

    get lectureIdList(): Array<LectureId> {
        return this._lectureIdList;
    }
}

export const classWeekConverter = {
    toFirestore: (classWeekData: ClassWeek) => {
        return {
            id: classWeekData.id,
            weekId: classWeekData.weekId,
            weekName: classWeekData.weekName,
            lectureIdList: classWeekData.lectureIdList
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new ClassWeek(data.id, data.weekId, data.weekName, data.lectureIdList);
    }
}
