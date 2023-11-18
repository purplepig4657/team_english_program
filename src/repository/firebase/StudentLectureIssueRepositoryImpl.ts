import {
    doc, getDoc, getDocs, updateDoc, collection, query, where,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

import StudentLectureIssueRepository from "../interface/StudentLectureIssueRepository";
import StudentLectureIssue, { studentLectureIssueConverter } from "../../model/StudentLectureIssue";
import StudentLectureIssueId from "../../model/identifier/StudentLectureIssueId";
import ClassId from "../../model/identifier/ClassId";
import {
    CLASS_COLLECTION_NAME,
    STUDENT_LECTURE_ISSUE_COLLECTION_NAME
} from "../common/firebaseCollectionNames";
import LectureId from "../../model/identifier/LectureId";

export default class StudentLectureIssueRepositoryImpl implements StudentLectureIssueRepository {

    async get(classId: ClassId, studentLectureIssueId: StudentLectureIssueId): Promise<StudentLectureIssue | null> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), classId.id);
        const studentLectureIssueRef = doc(collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION_NAME), studentLectureIssueId.id)
            .withConverter(studentLectureIssueConverter);
        const studentLectureIssueSnap: DocumentSnapshot<StudentLectureIssue> = await getDoc(studentLectureIssueRef);
        if (studentLectureIssueSnap.exists()) return studentLectureIssueSnap.data();
        else return null;
    }

    async getAll(classId: ClassId): Promise<Array<StudentLectureIssue>> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), classId.id);
        const studentLectureIssueListSnap: QuerySnapshot =
            await getDocs(collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION_NAME));
        const result: Array<StudentLectureIssue> = new Array<StudentLectureIssue>();
        studentLectureIssueListSnap.forEach((studentLectureIssueDBModel: QueryDocumentSnapshot) => {
            result.push(studentLectureIssueConverter.fromFirestore(studentLectureIssueDBModel));
        });
        return result;
    }

    async getAllByLectureId(classId: ClassId, lectureId: LectureId): Promise<Array<StudentLectureIssue>> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), classId.id);
        const studentLectureIssueRef = collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION_NAME);
        const q = query(studentLectureIssueRef, where("lectureId", "==", lectureId.id));
        const studentLectureIssueListSnap: QuerySnapshot = await getDocs(q);
        const result: Array<StudentLectureIssue> = new Array<StudentLectureIssue>();
        studentLectureIssueListSnap.forEach((studentLectureIssueDBModel: QueryDocumentSnapshot) => {
            result.push(studentLectureIssueConverter.fromFirestore(studentLectureIssueDBModel));
        });
        return result;
    }

    async update(classId: ClassId, studentLectureIssue: StudentLectureIssue): Promise<boolean> {
        const classRef = doc(collection(db, CLASS_COLLECTION_NAME), classId.id);
        const studentLectureIssueRef = doc(collection(classRef, STUDENT_LECTURE_ISSUE_COLLECTION_NAME),
            studentLectureIssue.idString);
        const updateModel = studentLectureIssueConverter.toFirestore(studentLectureIssue);
        return updateDoc(studentLectureIssueRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

}
