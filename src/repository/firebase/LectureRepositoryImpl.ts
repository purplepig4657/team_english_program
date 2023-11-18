import {
    doc, getDoc, getDocs, updateDoc, collection,
    QueryDocumentSnapshot, DocumentSnapshot, QuerySnapshot
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

import LectureRepository from "../interface/LectureRepository";
import Lecture, { lectureConverter } from "../../model/Lecture";
import LectureId from "../../model/identifier/LectureId";
import ClassId from "../../model/identifier/ClassId";
import {CLASS_COLLECTION_NAME, LECTURE_COLLECTION_NAME} from "../common/firebaseCollectionNames";

export default class LectureRepositoryImpl implements LectureRepository {

    async get(classId: ClassId, lectureId: LectureId): Promise<Lecture | null> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), classId.id);
        const lectureRef = doc(collection(classRef, LECTURE_COLLECTION_NAME), lectureId.id).withConverter(lectureConverter);
        const lectureSnap: DocumentSnapshot<Lecture> = await getDoc(lectureRef);
        if (lectureSnap.exists()) return lectureSnap.data();
        else return null;
    }

    async getAll(classId: ClassId): Promise<Array<Lecture>> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), classId.id);
        const lectureListSnap: QuerySnapshot =
            await getDocs(collection(classRef, LECTURE_COLLECTION_NAME));
        const result: Array<Lecture> = new Array<Lecture>();
        lectureListSnap.forEach((lectureDBModel: QueryDocumentSnapshot) => {
            result.push(lectureConverter.fromFirestore(lectureDBModel));
        });
        return result;
    }

    async update(classId: ClassId, lecture: Lecture): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), classId.id);
        const lectureRef = doc(collection(classRef, LECTURE_COLLECTION_NAME), lecture.idString);
        const updateModel = lectureConverter.toFirestore(lecture);
        return updateDoc(lectureRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

}
