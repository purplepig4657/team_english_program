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
    CLASS_COLLECTION_NAME,
    LECTURE_COLLECTION_NAME,
    STUDENT_LECTURE_ISSUE_COLLECTION_NAME
} from "../common/firebaseCollectionNames";

export default class ClassRepositoryImpl implements ClassRepository {

    async create(t: Class): Promise<Class> {
        const newClassRef = doc(collection(db, CLASS_COLLECTION_NAME)).withConverter(classConverter);
        const newClassId: ClassId = new ClassId(newClassRef.id);
        const newClass: Class = new Class(
            newClassId,
            new Array<StudentId>()
        );
        await setDoc(newClassRef, newClass);
        return newClass;
    }

    async get(id: ClassId): Promise<Class | null> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), id.id).withConverter(classConverter);
        const classSnap: DocumentSnapshot<Class> = await getDoc(classRef);
        if (classSnap.exists()) return classSnap.data();
        else return null;
    }

    async getAll(): Promise<Array<Class>> {
        const classListSnap: QuerySnapshot = await getDocs(collection(db, CLASS_COLLECTION_NAME));
        const result: Array<Class> = new Array<Class>();
        classListSnap.forEach((classDBModel: QueryDocumentSnapshot) => {
            result.push(classConverter.fromFirestore(classDBModel));
        });
        return result;
    }

    async update(t: Class): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), t.idString).withConverter(classConverter);
        const updateModel = classConverter.toFirestore(t);
        return updateDoc(classRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

    async delete(id: ClassId): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), id.id).withConverter(classConverter);
        return deleteDoc(classRef).then(() => true).catch(() => false);
    }

    async addStudentId(id: ClassId, studentId: StudentId): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), id.id).withConverter(classConverter);
        return updateDoc(classRef, {
            studentIdList: arrayUnion(studentId.id)
        }).then(() => true).catch(() => false);
    }

    async removeStudentId(id: ClassId, studentId: StudentId): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), id.id).withConverter(classConverter);
        return updateDoc(classRef, {
            studentIdList: arrayRemove(studentId.id)
        }).then(() => true).catch(() => false);
    }

    addLecture(id: ClassId, lecture: Lecture): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), id.id);
        const lectureRef = doc(collection(classRef, LECTURE_COLLECTION_NAME)).withConverter(lectureConverter);
        const newLecture = new Lecture(
            new LectureId(lectureRef.id),
            lecture.classId,
            lecture.weekId,
            lecture.name,
            lecture.teacherName
        );
        return setDoc(lectureRef, newLecture).then(() => true).catch(() => false);
    }

    removeLecture(id: ClassId, lectureId: LectureId): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), id.id);
        const lectureRef = doc(collection(classRef, LECTURE_COLLECTION_NAME), lectureId.id);
        return deleteDoc(lectureRef).then(() => true).catch(() => false);
    }

    addStudentLectureIssue(id: ClassId, studentLectureIssue: StudentLectureIssue): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), id.id);
        const studentLectureIssueRef = doc(collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION_NAME))
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
        return setDoc(studentLectureIssueRef, newStudentLectureIssue).then(() => true).catch(() => false);
    }

    removeStudentLectureIssue(id: ClassId, studentLectureIssueId: StudentLectureIssueId): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), id.id);
        const studentLectureIssueRef = doc(collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION_NAME), studentLectureIssueId.id);
        return deleteDoc(studentLectureIssueRef).then(() => true).catch(() => false);
    }
}
