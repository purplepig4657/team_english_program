import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

import WeekId from "./identifier/WeekId";

export default class Week {
    private readonly _id: WeekId;
    private _name: string;

    public constructor(id: WeekId, name: string) {
        this._id = id;
        this._name = name;
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

}

interface WeekDBModel extends DocumentData {
    name: string;
}

export const weekConverter: FirestoreDataConverter<Week, WeekDBModel> = {
    toFirestore: (weekData: Week): WeekDBModel => {
        return {
            name: weekData.name,
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<WeekDBModel, WeekDBModel>,
        options?: SnapshotOptions
    ): Week => {
        const data = snapshot.data(options);
        return new Week(
            new WeekId(data.id),
            data.name
        );
    },
};
