import {
    doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, arrayUnion, arrayRemove, collection,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

import StudentRepository from "../interface/StudentRepository";
import Student, { studentConverter } from "../../model/Student";
import StudentWeekIssue, {studentWeekIssueConverter} from "../../model/StudentWeekIssue";
import TuitionPayment, {tuitionPaymentConverter} from "../../model/TuitionPayment";
import StudentId from "../../model/identifier/StudentId";
import ClassId from "../../model/identifier/ClassId";
import StudentWeekIssueId from "../../model/identifier/StudentWeekIssueId";
import TuitionPaymentId from "../../model/identifier/TuitionPaymentId";
import {
    STUDENT_COLLECTION_NAME,
    STUDENT_WEEK_ISSUE_COLLECTION_NAME,
    TUITION_PAYMENT_COLLECTION_NAME
} from "../common/firebaseCollectionNames";

export default class StudentRepositoryImpl implements StudentRepository {

    async create(t: Student): Promise<Student> {
        const newStudentRef = doc(collection(db, STUDENT_COLLECTION_NAME)).withConverter(studentConverter);
        const newStudentId: string = newStudentRef.id;
        const newStudent = new Student(
            new StudentId(newStudentId),
            t.classIdList,
            t.name
        );
        await setDoc(newStudentRef, newStudent);
        return newStudent;
    }

    async get(id: StudentId): Promise<Student | null> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION_NAME), id.id).withConverter(studentConverter);
        const studentSnap: DocumentSnapshot<Student> = await getDoc(studentRef);
        if (studentSnap.exists()) return studentSnap.data();
        else return null;
    }

    async getAll(): Promise<Array<Student>> {
        const studentListSnap: QuerySnapshot = await getDocs(collection(db, STUDENT_COLLECTION_NAME));
        const result: Array<Student> = new Array<Student>();
        studentListSnap.forEach((studentDBModel: QueryDocumentSnapshot) => {
            result.push(studentConverter.fromFirestore(studentDBModel));
        });
        return result;
    }

    async update(t: Student): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION_NAME), t.idString).withConverter(studentConverter);
        const updateModel = studentConverter.toFirestore(t);
        return updateDoc(studentRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

    async delete(id: StudentId): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION_NAME), id.id).withConverter(studentConverter);
        return deleteDoc(studentRef).then(() => true).catch(() => false);
    }

    async addClassId(id: StudentId, classId: ClassId): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION_NAME), id.id).withConverter(studentConverter);
        return updateDoc(studentRef, {
            classIdList: arrayUnion(classId.id),
        }).then(() => true).catch(() => false);
    }

    async removeClassId(id: StudentId, classId: ClassId): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION_NAME), id.id).withConverter(studentConverter);
        return updateDoc(studentRef, {
            classIdList: arrayRemove(classId.id),
        }).then(() => true).catch(() => false);
    }

    async addStudentWeekIssue(id: StudentId, studentWeekIssue: StudentWeekIssue): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION_NAME), id.id);
        const studentWeekIssueRef = doc(collection(studentRef, STUDENT_WEEK_ISSUE_COLLECTION_NAME))
            .withConverter(studentWeekIssueConverter);
        const newStudentWeekIssue = new StudentWeekIssue(
            new StudentWeekIssueId(studentWeekIssueRef.id),
            studentWeekIssue.studentId,
            studentWeekIssue.weekId,
            studentWeekIssue.lateness,
            studentWeekIssue.absence,
            studentWeekIssue.attitude,
            studentWeekIssue.scoreIssue
        );
        return setDoc(studentWeekIssueRef, newStudentWeekIssue).then(() => true).catch(() => false);
    }

    async removeStudentWeekIssue(id: StudentId, studentWeekIssueId: StudentWeekIssueId): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION_NAME), id.id);
        const studentWeekIssueRef = doc(collection(studentRef, STUDENT_WEEK_ISSUE_COLLECTION_NAME), studentWeekIssueId.id);
        return deleteDoc(studentWeekIssueRef).then(() => true).catch(() => false);
    }

    async addTuitionPayment(id: StudentId, tuitionPayment: TuitionPayment): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION_NAME), id.id);
        const tuitionPaymentRef = doc(collection(studentRef, TUITION_PAYMENT_COLLECTION_NAME))
            .withConverter(tuitionPaymentConverter);
        const newTuitionPayment = new TuitionPayment(
            new TuitionPaymentId(tuitionPaymentRef.id),
            tuitionPayment.studentId,
            tuitionPayment.amount,
            tuitionPayment.paymentDate
        );
        return setDoc(tuitionPaymentRef, newTuitionPayment).then(() => true).catch(() => false);
    }

    async removeTuitionPayment(id: StudentId, tuitionPaymentId: TuitionPaymentId): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION_NAME), id.id);
        const tuitionPaymentRef = doc(collection(studentRef, TUITION_PAYMENT_COLLECTION_NAME), tuitionPaymentId.id);
        return deleteDoc(tuitionPaymentRef).then(() => true).catch(() => false);
    }

}
