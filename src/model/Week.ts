import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    Timestamp
} from "firebase/firestore";

import WeekId from "./identifier/WeekId";

export default class Week {
    private readonly _id: WeekId;
    private _name: string;
    private readonly _startDate: Date;

    public constructor(id: WeekId, name: string, startDate: Date) {
        this._id = id;
        this._name = name;
        this._startDate = startDate;
    }

    // Getter

    get idObject(): WeekId {
        return this._id;
    }

    get id(): string {
        return this._id.id;
    }

    get name(): string {
        return this._name;
    }

    get startDate(): Date {
        return this._startDate;
    }

}

interface WeekDBModel extends DocumentData {
    name: string;
    startDate: Timestamp
}

export const weekConverter: FirestoreDataConverter<Week, WeekDBModel> = {
    toFirestore: (weekData: Week): WeekDBModel => {
        return {
            name: weekData.name,
            startDate: Timestamp.fromDate(weekData.startDate)
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<WeekDBModel, WeekDBModel>,
        options?: SnapshotOptions
    ): Week => {
        const data = snapshot.data(options);
        return new Week(
            new WeekId(snapshot.id),
            data.name,
            data.startDate.toDate()
        );
    },
};
