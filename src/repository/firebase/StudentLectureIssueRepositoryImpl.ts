import {
    doc, getDoc, getDocs, updateDoc, collection, query, where,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot, and
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

import StudentLectureIssueRepository from "../interface/StudentLectureIssueRepository";
import StudentLectureIssue, { studentLectureIssueConverter } from "../../model/StudentLectureIssue";
import StudentLectureIssueId from "../../model/identifier/StudentLectureIssueId";
import ClassId from "../../model/identifier/ClassId";
import {
    CLASS_COLLECTION,
    STUDENT_LECTURE_ISSUE_COLLECTION
} from "../common/firebaseCollectionNames";
import LectureId from "../../model/identifier/LectureId";
import StudentId from "../../model/identifier/StudentId";

export default class StudentLectureIssueRepositoryImpl implements StudentLectureIssueRepository {

    async get(classId: ClassId, studentLectureIssueId: StudentLectureIssueId): Promise<StudentLectureIssue | null> {
        console.log("StudentLectureIssueRepositoryImpl read");
        const classRef = doc(collection(db, CLASS_COLLECTION), classId.id);
        const studentLectureIssueRef = doc(collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION), studentLectureIssueId.id)
            .withConverter(studentLectureIssueConverter);
        const studentLectureIssueSnap: DocumentSnapshot<StudentLectureIssue> = await getDoc(studentLectureIssueRef);
        if (studentLectureIssueSnap.exists()) return studentLectureIssueSnap.data();
        else return null;
    }

    async getAll(classId: ClassId): Promise<Array<StudentLectureIssue>> {
        console.log("StudentLectureIssueRepositoryImpl read");
        const classRef = doc(collection(db, CLASS_COLLECTION), classId.id);
        const studentLectureIssueListSnap: QuerySnapshot =
            await getDocs(collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION));
        const result: Array<StudentLectureIssue> = new Array<StudentLectureIssue>();
        studentLectureIssueListSnap.forEach((studentLectureIssueDBModel: QueryDocumentSnapshot) => {
            result.push(studentLectureIssueConverter.fromFirestore(studentLectureIssueDBModel));
        });
        return result;
    }

    async getAllByLectureId(classId: ClassId, lectureId: LectureId): Promise<Array<StudentLectureIssue>> {
        console.log("StudentLectureIssueRepositoryImpl read");
        const classRef = doc(collection(db, CLASS_COLLECTION), classId.id);
        const studentLectureIssueRef = collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION);
        const q = query(studentLectureIssueRef, where("lectureId", "==", lectureId.id));
        const studentLectureIssueListSnap: QuerySnapshot = await getDocs(q);
        const result: Array<StudentLectureIssue> = new Array<StudentLectureIssue>();
        studentLectureIssueListSnap.forEach((studentLectureIssueDBModel: QueryDocumentSnapshot) => {
            result.push(studentLectureIssueConverter.fromFirestore(studentLectureIssueDBModel));
        });
        return result;
    }

    async getAllByLectureIdAndStudentId(
        classId: ClassId,
        lectureId: LectureId,
        studentId: StudentId
    ): Promise<Array<StudentLectureIssue>> {
        console.log("StudentLectureIssueRepositoryImpl read");
        const classRef = doc(collection(db, CLASS_COLLECTION), classId.id);
        const studentLectureIssueRef = collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION);
        const q = query(studentLectureIssueRef, and(
            where("lectureId", "==", lectureId.id),
            where("studentId", "==", studentId.id)
        ));
        const studentLectureIssueListSnap: QuerySnapshot = await getDocs(q);
        const result: Array<StudentLectureIssue> = new Array<StudentLectureIssue>();
        studentLectureIssueListSnap.forEach((studentLectureIssueDBModel: QueryDocumentSnapshot) => {
            result.push(studentLectureIssueConverter.fromFirestore(studentLectureIssueDBModel));
        });
        return result;
    }

    async update(classId: ClassId, studentLectureIssue: StudentLectureIssue): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION), classId.id);
        const studentLectureIssueRef = doc(collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION),
            studentLectureIssue.idString);
        const updateModel = studentLectureIssueConverter.toFirestore(studentLectureIssue);
        return updateDoc(studentLectureIssueRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

}
