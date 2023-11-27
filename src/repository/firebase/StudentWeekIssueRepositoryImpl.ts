import {
    doc, getDoc, getDocs, updateDoc, collection, collectionGroup,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot, DocumentReference, query, where, and
} from "firebase/firestore";

import {db} from "../../config/firebaseConfig";

import StudentWeekIssueRepository from "../interface/StudentWeekIssueRepository";
import StudentWeekIssue, {studentWeekIssueConverter} from "../../model/StudentWeekIssue";
import StudentWeekIssueId from "../../model/identifier/StudentWeekIssueId";
import StudentId from "../../model/identifier/StudentId";
import { STUDENT_COLLECTION, STUDENT_WEEK_ISSUE_COLLECTION } from "../common/firebaseCollectionNames";
import WeekId from "../../model/identifier/WeekId";
import issueChart from "../../ui/student_info/component/IssueChart";

export default class StudentWeekIssueRepositoryImpl implements StudentWeekIssueRepository {

    async get(id: StudentId | DocumentReference, studentWeekIssueId: StudentWeekIssueId): Promise<StudentWeekIssue | null> {
        const studentRef = id instanceof StudentId ? doc(collection(db, STUDENT_COLLECTION), id.id) : id;
        const studentWeekIssueRef = doc(collection(studentRef, STUDENT_WEEK_ISSUE_COLLECTION), studentWeekIssueId.id)
            .withConverter(studentWeekIssueConverter);
        const studentWeekIssueSnap: DocumentSnapshot<StudentWeekIssue> = await getDoc(studentWeekIssueRef);
        if (studentWeekIssueSnap.exists()) return studentWeekIssueSnap.data();
        else return null;
    }

    async getByWeekId(id: StudentId, weekId: WeekId): Promise<StudentWeekIssue | null> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION), id.id);
        const q = query(collection(studentRef, STUDENT_WEEK_ISSUE_COLLECTION), where("weekId", '==', weekId.id));
        const studentWeekIssueListSnap: QuerySnapshot = await getDocs(q);
        if (studentWeekIssueListSnap.size > 1) {
            throw "StudentWeekIssue Duplicated";
        } else if (studentWeekIssueListSnap.size === 0) {
            return null;
        } else {
            return studentWeekIssueConverter.fromFirestore(studentWeekIssueListSnap.docs[0])
        }
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

    async getAllByWeekId(studentIdList: Array<StudentId>, weekId: WeekId): Promise<Array<StudentWeekIssue>> {
        const studentIdStringList: Array<string> = studentIdList.map((studentId: StudentId) => studentId.id);
        const q = query(
            collectionGroup(db, STUDENT_WEEK_ISSUE_COLLECTION),
            and(where("studentId", 'in', studentIdStringList), where("weekId", '==', weekId.id))
        );
        const studentWeekIssueListSnap: QuerySnapshot = await getDocs(q);
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
