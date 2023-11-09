import {
    doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, collection,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

import StudentLectureIssueRepository from "../interface/StudentLectureIssueRepository";
import StudentLectureIssue, { studentLectureIssueConverter } from "../../model/StudentLectureIssue";
import StudentLectureIssueId from "../../model/identifier/StudentLectureIssueId";

export default class StudentLectureIssueRepositoryImpl implements StudentLectureIssueRepository {

    private COLLECTION_NAME = "student_lecture_issues";

    async create(t: StudentLectureIssue): Promise<StudentLectureIssue> {
        const newIssueRef = doc(collection(db, this.COLLECTION_NAME)).withConverter(studentLectureIssueConverter);
        const newIssueId: string = newIssueRef.id;
        const newIssue = new StudentLectureIssue(
            new StudentLectureIssueId(newIssueId),
            t.studentId,
            t.lateness,
            t.absence,
            t.attitude,
            t.scoreIssue,
            t.latenessComment,
            t.absenceComment,
            t.attitudeComment,
            t.scoreIssueComment
        );
        await setDoc(newIssueRef, newIssue);
        return newIssue;
    }

    async get(id: StudentLectureIssueId): Promise<StudentLectureIssue | null> {
        const issueRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(studentLectureIssueConverter);
        const issueSnap: DocumentSnapshot<StudentLectureIssue> = await getDoc(issueRef);
        if (issueSnap.exists()) return issueSnap.data();
        else return null;
    }

    async getAll(): Promise<Array<StudentLectureIssue>> {
        const issueListSnap: QuerySnapshot = await getDocs(collection(db, this.COLLECTION_NAME));
        const result: Array<StudentLectureIssue> = new Array<StudentLectureIssue>();
        issueListSnap.forEach((issueDBModel: QueryDocumentSnapshot) => {
            result.push(studentLectureIssueConverter.fromFirestore(issueDBModel));
        });
        return result;
    }

    async update(t: StudentLectureIssue): Promise<boolean> {
        const issueRef = doc(collection(db, this.COLLECTION_NAME), t.id).withConverter(studentLectureIssueConverter);
        const updateModel = studentLectureIssueConverter.toFirestore(t);
        return updateDoc(issueRef, {
            ...updateModel,
        }).then(() => true).catch(() => false);
    }

    async delete(id: StudentLectureIssueId): Promise<boolean> {
        const issueRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(studentLectureIssueConverter);
        return deleteDoc(issueRef).then(() => true).catch(() => false);
    }
}
