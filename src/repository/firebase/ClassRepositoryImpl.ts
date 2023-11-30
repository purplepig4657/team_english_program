import {
    doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, arrayUnion, arrayRemove, collection,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot,
} from "firebase/firestore"

import { db } from "../../config/firebaseConfig";

import ClassRepository from "../interface/ClassRepository";
import Class, { classConverter } from "../../model/Class";
import ClassId from "../../model/identifier/ClassId";
import StudentId from "../../model/identifier/StudentId";
import Lecture, {lectureConverter} from "../../model/Lecture";
import LectureId from "../../model/identifier/LectureId";
import StudentLectureIssue, {studentLectureIssueConverter} from "../../model/StudentLectureIssue";
import StudentLectureIssueId from "../../model/identifier/StudentLectureIssueId";
import {
    CLASS_COLLECTION,
    LECTURE_COLLECTION,
    STUDENT_LECTURE_ISSUE_COLLECTION
} from "../common/firebaseCollectionNames";

export default class ClassRepositoryImpl implements ClassRepository {

    async create(t: Class): Promise<Class> {
        const newClassRef = doc(collection(db, CLASS_COLLECTION), t.idString).withConverter(classConverter);
        await setDoc(newClassRef, t);
        return t;
    }

    async get(id: ClassId): Promise<Class | null> {
        console.log("ClassRepositoryImpl read");
        const classRef = doc(collection(db, CLASS_COLLECTION), id.id).withConverter(classConverter);
        const classSnap: DocumentSnapshot<Class> = await getDoc(classRef);
        if (classSnap.exists()) return classSnap.data();
        else return null;
    }

    async getAll(): Promise<Array<Class>> {
        console.log("ClassRepositoryImpl read");
        const classListSnap: QuerySnapshot = await getDocs(collection(db, CLASS_COLLECTION));
        const result: Array<Class> = new Array<Class>();
        classListSnap.forEach((classDBModel: QueryDocumentSnapshot) => {
            result.push(classConverter.fromFirestore(classDBModel));
        });
        return result;
    }

    async update(t: Class): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION), t.idString).withConverter(classConverter);
        const updateModel = classConverter.toFirestore(t);
        return updateDoc(classRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

    async delete(id: ClassId): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION), id.id).withConverter(classConverter);
        return deleteDoc(classRef).then(() => true).catch(() => false);
    }

    // async addStudentId(id: ClassId, studentId: StudentId): Promise<boolean> {
    //     const classRef = doc(collection(db, CLASS_COLLECTION), id.id).withConverter(classConverter);
    //     return updateDoc(classRef, {
    //         studentIdList: arrayUnion(studentId.id)
    //     }).then(() => true).catch(() => false);
    // }
    //
    // async removeStudentId(id: ClassId, studentId: StudentId): Promise<boolean> {
    //     const classRef = doc(collection(db, CLASS_COLLECTION), id.id).withConverter(classConverter);
    //     return updateDoc(classRef, {
    //         studentIdList: arrayRemove(studentId.id)
    //     }).then(() => true).catch(() => false);
    // }

    async addLecture(id: ClassId, lecture: Lecture): Promise<Lecture> {
        const classRef = doc(collection(db, CLASS_COLLECTION), id.id);
        const lectureRef = doc(collection(classRef, LECTURE_COLLECTION)).withConverter(lectureConverter);
        const newLecture = new Lecture(
            new LectureId(lectureRef.id),
            lecture.classId,
            lecture.weekId,
            lecture.name,
            lecture.teacherName
        );
        // TODO: 예외 처리
        await setDoc(lectureRef, newLecture).then(() => true).catch(() => false);
        return newLecture;
    }

    async removeLecture(id: ClassId, lectureId: LectureId): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION), id.id);
        const lectureRef = doc(collection(classRef, LECTURE_COLLECTION), lectureId.id);
        return await deleteDoc(lectureRef).then(() => true).catch(() => false);
    }

    async addStudentLectureIssue(id: ClassId, studentLectureIssue: StudentLectureIssue): Promise<StudentLectureIssue> {
        const classRef = doc(collection(db, CLASS_COLLECTION), id.id);
        const studentLectureIssueRef = doc(collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION))
            .withConverter(studentLectureIssueConverter);
        const newStudentLectureIssue = new StudentLectureIssue(
            new StudentLectureIssueId(studentLectureIssueRef.id),
            studentLectureIssue.classId,
            studentLectureIssue.lectureId,
            studentLectureIssue.studentId,
            studentLectureIssue.lateness,
            studentLectureIssue.absence,
            studentLectureIssue.attitude,
            studentLectureIssue.scoreIssue,
            studentLectureIssue.latenessComment,
            studentLectureIssue.absenceComment,
            studentLectureIssue.attitudeComment,
            studentLectureIssue.scoreIssueComment
        );
        // TODO: 예외 처리
        await setDoc(studentLectureIssueRef, newStudentLectureIssue).then(() => true).catch(() => false);
        return newStudentLectureIssue;
    }

    removeStudentLectureIssue(id: ClassId, studentLectureIssueId: StudentLectureIssueId): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION), id.id);
        const studentLectureIssueRef = doc(collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION), studentLectureIssueId.id);
        return deleteDoc(studentLectureIssueRef).then(() => true).catch(() => false);
    }
}
