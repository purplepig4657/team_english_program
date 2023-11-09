import {
    QueryDocumentSnapshot,
    SnapshotOptions,
    FirestoreDataConverter,
    DocumentData
} from "firebase/firestore";

import ClassWeekId from "./identifier/ClassWeekId";
import LectureId from "./identifier/LectureId";
import WeekId from "./identifier/WeekId";
import ClassId from "./identifier/ClassId";

export default class ClassWeek {
    private readonly _id: ClassWeekId;
    private readonly _weekId: WeekId;
    private _lectureIdList: Array<LectureId>;

    public constructor(
        id: ClassWeekId,
        weekId: WeekId,
        lectureIdList: Array<LectureId>
    ) {
        this._id = id;
        this._weekId = weekId;
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

    get lectureIdList(): Array<LectureId> {
        return this._lectureIdList;
    }
}

interface ClassWeekDBModel extends DocumentData {
    weekId: string,
    lectureIdList: Array<string>
}

export const classWeekConverter: FirestoreDataConverter<ClassWeek, ClassWeekDBModel> = {
    toFirestore: (classWeekData: ClassWeek): ClassWeekDBModel => {
        const lectureIdStringList: Array<string> =
            classWeekData.lectureIdList.map((lectureId: LectureId) => lectureId.id);
        return {
            weekId: classWeekData.weekId.id,
            lectureIdList: lectureIdStringList
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<ClassWeekDBModel, ClassWeekDBModel>,
        options?: SnapshotOptions
    ): ClassWeek => {
        const data = snapshot.data(options) as ClassWeekDBModel;
        const lectureIdList: Array<LectureId> =
            data.lectureIdList.map((lectureIdString: string) => new LectureId(lectureIdString))
        return new ClassWeek(
            new ClassId(data.id),
            new WeekId(data.weekId),
            lectureIdList
        );
    }

}
