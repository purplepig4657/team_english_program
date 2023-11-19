import {
    doc, getDoc, getDocs, updateDoc, collection,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot, DocumentReference
} from "firebase/firestore";

import {db} from "../../config/firebaseConfig";

import StudentWeekIssueRepository from "../interface/StudentWeekIssueRepository";
import StudentWeekIssue, {studentWeekIssueConverter} from "../../model/StudentWeekIssue";
import StudentWeekIssueId from "../../model/identifier/StudentWeekIssueId";
import StudentId from "../../model/identifier/StudentId";
import { STUDENT_COLLECTION, STUDENT_WEEK_ISSUE_COLLECTION } from "../common/firebaseCollectionNames";

export default class StudentWeekIssueRepositoryImpl implements StudentWeekIssueRepository {

    async get(id: StudentId | DocumentReference, studentWeekIssueId: StudentWeekIssueId): Promise<StudentWeekIssue | null> {
        const studentRef = id instanceof StudentId ? doc(collection(db, STUDENT_COLLECTION), id.id) : id;
        const studentWeekIssueRef = doc(collection(studentRef, STUDENT_WEEK_ISSUE_COLLECTION), studentWeekIssueId.id)
            .withConverter(studentWeekIssueConverter);
        const studentWeekIssueSnap: DocumentSnapshot<StudentWeekIssue> = await getDoc(studentWeekIssueRef);
        if (studentWeekIssueSnap.exists()) return studentWeekIssueSnap.data();
        else return null;
    }

    async getAll(id: StudentId | DocumentReference): Promise<Array<StudentWeekIssue>> {
        const studentRef = id instanceof StudentId ? doc(collection(db, STUDENT_COLLECTION), id.id) : id;
        const studentWeekIssueListSnap: QuerySnapshot =
            await getDocs(collection(studentRef, STUDENT_WEEK_ISSUE_COLLECTION));
        const result: Array<StudentWeekIssue> = new Array<StudentWeekIssue>();
        studentWeekIssueListSnap.forEach((studentWeekIssueDBModel: QueryDocumentSnapshot) => {
            result.push(studentWeekIssueConverter.fromFirestore(studentWeekIssueDBModel));
        });
        return result;
    }

    async update(id: StudentId | DocumentReference, studentWeekIssue: StudentWeekIssue): Promise<boolean> {
        const studentRef = id instanceof StudentId ? doc(collection(db, STUDENT_COLLECTION), id.id) : id;
        const studentWeekIssueRef = doc(collection(studentRef, STUDENT_WEEK_ISSUE_COLLECTION), studentWeekIssue.idString);
        const updateModel = studentWeekIssueConverter.toFirestore(studentWeekIssue);
        return updateDoc(studentWeekIssueRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

}
