import {
    doc, getDoc, getDocs, updateDoc, collection,
    QueryDocumentSnapshot, DocumentSnapshot, QuerySnapshot, query, where
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

import LectureRepository from "../interface/LectureRepository";
import Lecture, { lectureConverter } from "../../model/Lecture";
import LectureId from "../../model/identifier/LectureId";
import ClassId from "../../model/identifier/ClassId";
import {CLASS_COLLECTION, LECTURE_COLLECTION} from "../common/firebaseCollectionNames";
import WeekId from "../../model/identifier/WeekId";

export default class LectureRepositoryImpl implements LectureRepository {

    async get(classId: ClassId, lectureId: LectureId): Promise<Lecture | null> {
        console.log("LectureRepositoryImpl read");
        const classRef = doc(collection(db, CLASS_COLLECTION), classId.id);
        const lectureRef = doc(collection(classRef, LECTURE_COLLECTION), lectureId.id).withConverter(lectureConverter);
        const lectureSnap: DocumentSnapshot<Lecture> = await getDoc(lectureRef);
        if (lectureSnap.exists()) return lectureSnap.data();
        else return null;
    }

    async getAll(classId: ClassId): Promise<Array<Lecture>> {
        console.log("LectureRepositoryImpl read");
        const classRef = doc(collection(db, CLASS_COLLECTION), classId.id);
        const lectureListSnap: QuerySnapshot =
            await getDocs(collection(classRef, LECTURE_COLLECTION));
        const result: Array<Lecture> = new Array<Lecture>();
        lectureListSnap.forEach((lectureDBModel: QueryDocumentSnapshot) => {
            result.push(lectureConverter.fromFirestore(lectureDBModel));
        });
        return result;
    }

    async getAllByWeekId(classId: ClassId, weekId: WeekId): Promise<Array<Lecture>> {
        console.log("LectureRepositoryImpl read");
        const classRef = doc(collection(db, CLASS_COLLECTION), classId.id);
        const lectureRef = collection(classRef, LECTURE_COLLECTION);
        const q = query(lectureRef, where("weekId", "==", weekId.id));
        const lectureListSnap: QuerySnapshot = await getDocs(q);
        const result: Array<Lecture> = new Array<Lecture>();
        lectureListSnap.forEach((lectureDBModel: QueryDocumentSnapshot) => {
            result.push(lectureConverter.fromFirestore(lectureDBModel));
        });
        return result;
    }

    async update(classId: ClassId, lecture: Lecture): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION), classId.id);
        const lectureRef = doc(collection(classRef, LECTURE_COLLECTION), lecture.idString);
        const updateModel = lectureConverter.toFirestore(lecture);
        return updateDoc(lectureRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

}
