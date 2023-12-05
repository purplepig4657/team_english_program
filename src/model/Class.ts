import {
    DocumentData, FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

import ClassId from "./identifier/ClassId";

export default class Class {
    private _id: ClassId;  // Same with class name.
    private _disabled: boolean;

    public constructor(id: ClassId, disabled: boolean | null) {
        this._id = id;
        if (disabled === null) this._disabled = false;
        else this._disabled = disabled;
    }

    public changeClassId(newId: ClassId) {
        this._id = newId;
    }

    public disableClass() {
        this._disabled = true;
    }

    public enableClass() {
        this._disabled = false;
    }
    
    // Getter

    get id(): ClassId {
        return this._id;
    }

    get disabled(): boolean {
        return this._disabled;
    }
    
    get idString(): string {
        return this._id.id;
    }
}


interface ClassDBModel extends DocumentData {
    id: string;
    disabled: boolean | null;
}

export const classConverter: FirestoreDataConverter<Class, ClassDBModel> = {
    toFirestore: (classData: Class): ClassDBModel => {
        return {
            id: classData.idString,
            disabled: classData.disabled
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<ClassDBModel, ClassDBModel>,
        options?: SnapshotOptions
    ): Class => {
        const data = snapshot.data(options) as ClassDBModel;

        return new Class(
            new ClassId(snapshot.id),
            data.disabled
        );
    }

}
