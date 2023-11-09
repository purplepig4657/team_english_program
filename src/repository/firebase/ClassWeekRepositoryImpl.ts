import {
    doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, arrayUnion, arrayRemove, collection,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot,
} from "firebase/firestore"

import { db } from "../../config/firebaseConfig";

import ClassWeekRepository from "../interface/ClassWeekRepository";
import ClassWeek, { classWeekConverter } from "../../model/ClassWeek";
import ClassWeekId from "../../model/identifier/ClassWeekId";
import LectureId from "../../model/identifier/LectureId";
import WeekId from "../../model/identifier/WeekId";

export default class ClassWeekRepositoryImpl implements ClassWeekRepository {

    private COLLECTION_NAME = "class_weeks";

    async create(t: ClassWeek): Promise<ClassWeek> {
        const newClassWeekRef = doc(collection(db, this.COLLECTION_NAME)).withConverter(classWeekConverter);
        const newClassWeekId: string = newClassWeekRef.id
        const newClassWeek = new ClassWeek(
            new ClassWeekId(newClassWeekId),
            new WeekId("asdf"),
            new Array<LectureId>()
        );
        await setDoc(newClassWeekRef, newClassWeek);
        return newClassWeek;
    }

    async get(id: ClassWeekId): Promise<ClassWeek | null> {
        const classWeekRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(classWeekConverter);
        const classWeekSnap: DocumentSnapshot<ClassWeek> = await getDoc(classWeekRef);
        if (classWeekSnap.exists()) return classWeekSnap.data();
        else return null;
    }

    async getAll(): Promise<Array<ClassWeek>> {
        const classWeekListSnap: QuerySnapshot = await getDocs(collection(db, this.COLLECTION_NAME));
        const result: Array<ClassWeek> = new Array<ClassWeek>();
        classWeekListSnap.forEach((classWeekDBModel: QueryDocumentSnapshot) => {
            result.push(classWeekConverter.fromFirestore(classWeekDBModel));
        })
        return result;
    }

    async update(t: ClassWeek): Promise<boolean> {
        const classWeekRef = doc(collection(db, this.COLLECTION_NAME), t.id).withConverter(classWeekConverter);
        const updateModel = classWeekConverter.toFirestore(t);
        return updateDoc(classWeekRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

    async delete(id: ClassWeekId): Promise<boolean> {
        const classWeekRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(classWeekConverter);
        return deleteDoc(classWeekRef).then(() => true).catch(() => false);
    }

    pushLectureList(id: ClassWeekId, lectureId: LectureId): Promise<boolean> {
        const classWeekRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(classWeekConverter);
        return updateDoc(classWeekRef, {
            lectureIdList: arrayUnion(lectureId.id)
        }).then(() => true).catch(() => false);
    }

    removeLectureList(id: ClassWeekId, lectureId: LectureId): Promise<boolean> {
        const classWeekRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(classWeekConverter);
        return updateDoc(classWeekRef, {
            lectureIdList: arrayRemove(lectureId.id)
        }).then(() => true).catch(() => false);
    }

}
