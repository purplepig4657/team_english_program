import {
    DocumentData, FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions
} from "firebase/firestore";

import ClassId from "./identifier/ClassId";

export default class Class {
    private _id: ClassId;  // Same with class name.

    public constructor(id: ClassId) {
        this._id = id;
    }
    
    // Getter

    get id(): ClassId {
        return this._id;
    }
    
    get idString(): string {
        return this._id.id;
    }
}


interface ClassDBModel extends DocumentData {
    id: string;
}

export const classConverter: FirestoreDataConverter<Class, ClassDBModel> = {
    toFirestore: (classData: Class): ClassDBModel => {
        return {
            id: classData.idString
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<ClassDBModel, ClassDBModel>,
        options?: SnapshotOptions
    ): Class => {
        // const data = snapshot.data(options) as ClassDBModel;

        return new Class(
            new ClassId(snapshot.id)
        );
    }

}
