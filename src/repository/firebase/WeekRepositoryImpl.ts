import {
    doc, getDoc, getDocs, updateDoc, deleteDoc, collection, setDoc,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

import WeekRepository from "../interface/WeekRepository";
import Week, { weekConverter } from "../../model/Week";
import WeekId from "../../model/identifier/WeekId";

export default class WeekRepositoryImpl implements WeekRepository {

    private COLLECTION_NAME = "weeks";

    async create(t: Week): Promise<Week> {
        const newWeekRef = doc(collection(db, this.COLLECTION_NAME)).withConverter(weekConverter);
        const newWeekId: string = newWeekRef.id;
        const newWeek = new Week(
            new WeekId(newWeekId),
            t.name,
            t.startDate
        );
        await setDoc(newWeekRef, newWeek);
        return newWeek;
    }

    async get(id: WeekId): Promise<Week | null> {
        const weekRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(weekConverter);
        const weekSnap: DocumentSnapshot<Week> = await getDoc(weekRef);
        if (weekSnap.exists()) return weekSnap.data();
        else return null;
    }

    async getAll(): Promise<Array<Week>> {
        const weekListSnap: QuerySnapshot = await getDocs(collection(db, this.COLLECTION_NAME));
        const result: Array<Week> = new Array<Week>();
        weekListSnap.forEach((weekDBModel: QueryDocumentSnapshot) => {
            result.push(weekConverter.fromFirestore(weekDBModel));
        });
        return result;
    }

    async update(t: Week): Promise<boolean> {
        const weekRef = doc(collection(db, this.COLLECTION_NAME), t.id).withConverter(weekConverter);
        const updateModel = weekConverter.toFirestore(t);
        return updateDoc(weekRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

    async delete(id: WeekId): Promise<boolean> {
        const weekRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(weekConverter);
        return deleteDoc(weekRef).then(() => true).catch(() => false);
    }
}
