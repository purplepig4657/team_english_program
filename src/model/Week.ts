import firebase from "firebase/compat";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import SnapshotOptions = firebase.firestore.SnapshotOptions;

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

export const weekConverter = {
    toFirestore: (weekData: Week) => {
        return {
            id: weekData.id,
            name: weekData.name,
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new Week(
            data.id,
            data.name
        );
    }
}
