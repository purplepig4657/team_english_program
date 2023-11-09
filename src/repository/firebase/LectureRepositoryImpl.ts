import {
    doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, arrayUnion, arrayRemove, collection,
    QueryDocumentSnapshot, DocumentSnapshot, QuerySnapshot
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

import LectureRepository from "../interface/LectureRepository";
import Lecture, { lectureConverter } from "../../model/Lecture";
import LectureId from "../../model/identifier/LectureId";
import StudentLectureIssueId from "../../model/identifier/StudentLectureIssueId";

export default class LectureRepositoryImpl implements LectureRepository {

    private COLLECTION_NAME = "lectures";

    async create(t: Lecture): Promise<Lecture> {
        const newLectureRef = doc(collection(db, this.COLLECTION_NAME)).withConverter(lectureConverter);
        const newLectureId: string = newLectureRef.id;
        const newLecture = new Lecture(
            new LectureId(newLectureId),
            t.name,
            t.teacherName,
            t.studentLectureIssueIdList
        );
        await setDoc(newLectureRef, newLecture);
        return newLecture;
    }

    async get(id: LectureId): Promise<Lecture | null> {
        const lectureRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(lectureConverter);
        const lectureSnap: DocumentSnapshot<Lecture> = await getDoc(lectureRef);
        if (lectureSnap.exists()) return lectureSnap.data();
        else return null;
    }

    async getAll(): Promise<Array<Lecture>> {
        const lectureListSnap: QuerySnapshot = await getDocs(collection(db, this.COLLECTION_NAME));
        const result: Array<Lecture> = new Array<Lecture>();
        lectureListSnap.forEach((lectureDBModel: QueryDocumentSnapshot) => {
            result.push(lectureConverter.fromFirestore(lectureDBModel));
        });
        return result;
    }

    async update(t: Lecture): Promise<boolean> {
        const lectureRef = doc(collection(db, this.COLLECTION_NAME), t.id).withConverter(lectureConverter);
        const updateModel = lectureConverter.toFirestore(t);
        return updateDoc(lectureRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

    async delete(id: LectureId): Promise<boolean> {
        const lectureRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(lectureConverter);
        return deleteDoc(lectureRef).then(() => true).catch(() => false);
    }

    async pushStudentLectureIssueList(id: LectureId, studentLectureIssueId: StudentLectureIssueId): Promise<boolean> {
        const lectureRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(lectureConverter);
        return updateDoc(lectureRef, {
            studentLectureIssueIdList: arrayUnion(studentLectureIssueId.id),
        }).then(() => true).catch(() => false);
    }

    async removeStudentLectureIssueList(id: LectureId, studentLectureIssueId: StudentLectureIssueId): Promise<boolean> {
        const lectureRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(lectureConverter);
        return updateDoc(lectureRef, {
            studentLectureIssueIdList: arrayRemove(studentLectureIssueId.id),
        }).then(() => true).catch(() => false);
    }
}
