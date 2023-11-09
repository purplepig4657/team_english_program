import {
    doc, getDoc, getDocs, updateDoc, deleteDoc, collection, setDoc,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

import StudentWeekIssueRepository from "../interface/StudentWeekIssueRepository";
import StudentWeekIssue, { studentWeekIssueConverter } from "../../model/StudentWeekIssue";
import StudentWeekIssueId from "../../model/identifier/StudentWeekIssueId";

export default class StudentWeekIssueRepositoryImpl implements StudentWeekIssueRepository {

    private COLLECTION_NAME = "student_week_issues";

    async create(t: StudentWeekIssue): Promise<StudentWeekIssue> {
        const newIssueRef = doc(collection(db, this.COLLECTION_NAME)).withConverter(studentWeekIssueConverter);
        const newIssueId: string = newIssueRef.id;
        const newIssue = new StudentWeekIssue(
            new StudentWeekIssueId(newIssueId),
            t.weekId,
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

    async get(id: StudentWeekIssueId): Promise<StudentWeekIssue | null> {
        const issueRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(studentWeekIssueConverter);
        const issueSnap: DocumentSnapshot<StudentWeekIssue> = await getDoc(issueRef);
        if (issueSnap.exists()) return issueSnap.data();
        else return null;
    }

    async getAll(): Promise<Array<StudentWeekIssue>> {
        const issueListSnap: QuerySnapshot = await getDocs(collection(db, this.COLLECTION_NAME));
        const result: Array<StudentWeekIssue> = new Array<StudentWeekIssue>();
        issueListSnap.forEach((issueDBModel: QueryDocumentSnapshot) => {
            result.push(studentWeekIssueConverter.fromFirestore(issueDBModel));
        });
        return result;
    }

    async update(t: StudentWeekIssue): Promise<boolean> {
        const issueRef = doc(collection(db, this.COLLECTION_NAME), t.id).withConverter(studentWeekIssueConverter);
        const updateModel = studentWeekIssueConverter.toFirestore(t);
        return updateDoc(issueRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

    async delete(id: StudentWeekIssueId): Promise<boolean> {
        const issueRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(studentWeekIssueConverter);
        return deleteDoc(issueRef).then(() => true).catch(() => false);
    }
}
