import {
    collection, deleteDoc,
    doc,
    DocumentSnapshot,
    getDoc,
    getDocs,
    QueryDocumentSnapshot,
    QuerySnapshot,
    setDoc, updateDoc
} from "firebase/firestore";

import {db} from "../../config/firebaseConfig";

import StudentIssueRepository from "../interface/StudentIssueRepository";
import StudentIssue, {studentIssueConverter} from "../../model/StudentIssue";
import StudentIssueId from "../../model/identifier/StudentIssueId";
import {STUDENT_ISSUE_COLLECTION} from "../common/firebaseCollectionNames";


export default class StudentIssueRepositoryImpl implements StudentIssueRepository {

    async create(t: StudentIssue): Promise<StudentIssue> {
        const newStudentIssueRef = doc(collection(db, STUDENT_ISSUE_COLLECTION)).withConverter(studentIssueConverter);
        const newStudentIssueId: string = newStudentIssueRef.id;
        const newStudentIssue = new StudentIssue(
            new StudentIssueId(newStudentIssueId),
            t.studentId,
            t.lateness,
            t.absence,
            t.attitude,
            t.scoreIssue
        );
        await setDoc(newStudentIssueRef, newStudentIssue);
        return newStudentIssue;
    }

    async get(id: StudentIssueId): Promise<StudentIssue | null> {
        const studentIssueRef = doc(collection(db, STUDENT_ISSUE_COLLECTION), id.id).withConverter(studentIssueConverter);
        const studentIssueSnap: DocumentSnapshot<StudentIssue> = await getDoc(studentIssueRef);
        if (studentIssueSnap.exists()) return studentIssueSnap.data();
        else return null;
    }

    async getAll(): Promise<Array<StudentIssue>> {
        const studentIssueListSnap: QuerySnapshot = await getDocs(collection(db, STUDENT_ISSUE_COLLECTION));
        const result: Array<StudentIssue> = new Array<StudentIssue>();
        studentIssueListSnap.forEach((studentIssueDBModel: QueryDocumentSnapshot) => {
            result.push(studentIssueConverter.fromFirestore(studentIssueDBModel));
        });
        return result;
    }

    async update(t: StudentIssue): Promise<boolean> {
        const studentIssueRef = doc(collection(db, STUDENT_ISSUE_COLLECTION), t.idString).withConverter(studentIssueConverter);
        const updateModel = studentIssueConverter.toFirestore(t);
        return updateDoc(studentIssueRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

    async delete(id: StudentIssueId): Promise<boolean> {
        const studentIssueRef = doc(collection(db, STUDENT_ISSUE_COLLECTION), id.id).withConverter(studentIssueConverter);
        return deleteDoc(studentIssueRef).then(() => true).catch(() => false);
    }

}
