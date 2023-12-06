import {
    doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, arrayUnion, arrayRemove, collection,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot, query, where, orderBy, limit
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
    STUDENT_COLLECTION,
    STUDENT_WEEK_ISSUE_COLLECTION,
    TUITION_PAYMENT_COLLECTION
} from "../common/firebaseCollectionNames";

export default class StudentRepositoryImpl implements StudentRepository {

    async create(t: Student): Promise<Student> {
        const newStudentRef = doc(collection(db, STUDENT_COLLECTION)).withConverter(studentConverter);
        const newStudentId: string = newStudentRef.id;
        const newStudent = new Student(
            new StudentId(newStudentId),
            t.classIdList,
            t.classNameList,
            t.name,
            t.englishName,
            new Date(),
            new Date(),
            t.tuitionDate,
        );
        await setDoc(newStudentRef, newStudent);
        return newStudent;
    }

    async get(id: StudentId): Promise<Student | null> {
        console.log("StudentRepositoryImpl read");
        const studentRef = doc(collection(db, STUDENT_COLLECTION), id.id).withConverter(studentConverter);
        const studentSnap: DocumentSnapshot<Student> = await getDoc(studentRef);
        if (studentSnap.exists()) return studentSnap.data();
        else return null;
    }

    async getLastCreatedStudent(): Promise<Student> {
        console.log("StudentRepositoryImpl read");
        const q = query(collection(db, STUDENT_COLLECTION), orderBy("createdAt", "desc"), limit(1));
        const studentSnap: QuerySnapshot = await getDocs(q);
        const result: Array<Student> = new Array<Student>();
        studentSnap.forEach((studentDBModel: QueryDocumentSnapshot) => {
            result.push(studentConverter.fromFirestore(studentDBModel));
        });
        return result[0];
    }

    async getLastUpdatedStudent(): Promise<Student> {
        console.log("StudentRepositoryImpl read");
        const q = query(collection(db, STUDENT_COLLECTION), orderBy("updatedAt", "desc"), limit(1));
        const studentSnap: QuerySnapshot = await getDocs(q);
        const result: Array<Student> = new Array<Student>();
        studentSnap.forEach((studentDBModel: QueryDocumentSnapshot) => {
            result.push(studentConverter.fromFirestore(studentDBModel));
        });
        return result[0];
    }

    async getAllByIdList(idList: Array<StudentId>): Promise<Array<Student>> {
        console.log("StudentRepositoryImpl read");
        const idStringList: Array<string> = idList.map((id: StudentId) => id.id);
        const q = query(collection(db, STUDENT_COLLECTION), where("id", 'in', idStringList));
        const studentListSnap: QuerySnapshot = await getDocs(q);
        const result: Array<Student> = new Array<Student>();
        studentListSnap.forEach((studentDBModel: QueryDocumentSnapshot) => {
            result.push(studentConverter.fromFirestore(studentDBModel));
        });
        return result;
    }

    async getAllByClassId(classId: ClassId): Promise<Array<Student>> {
        console.log("StudentRepositoryImpl read");
        const classIdString: string = classId.id;
        const q = query(collection(db, STUDENT_COLLECTION), where("classIdList", "array-contains", classIdString));
        const studentListSnap: QuerySnapshot = await getDocs(q);
        const result: Array<Student> = new Array<Student>();
        studentListSnap.forEach((studentDBModel: QueryDocumentSnapshot) => {
            result.push(studentConverter.fromFirestore(studentDBModel));
        });
        return result;
    }

    async getAll(): Promise<Array<Student>> {
        console.log("StudentRepositoryImpl read");
        const studentListSnap: QuerySnapshot = await getDocs(collection(db, STUDENT_COLLECTION));
        const result: Array<Student> = new Array<Student>();
        studentListSnap.forEach((studentDBModel: QueryDocumentSnapshot) => {
            result.push(studentConverter.fromFirestore(studentDBModel));
        });
        return result;
    }

    async update(t: Student): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION), t.idString).withConverter(studentConverter);
        const updateModel = studentConverter.toFirestore(t);
        return updateDoc(studentRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

    async delete(id: StudentId): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION), id.id).withConverter(studentConverter);
        return deleteDoc(studentRef).then(() => true).catch(() => false);
    }

    async addClassId(id: StudentId, classId: ClassId): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION), id.id).withConverter(studentConverter);
        return updateDoc(studentRef, {
            classIdList: arrayUnion(classId.id),
        }).then(() => true).catch(() => false);
    }

    async removeClassId(id: StudentId, classId: ClassId): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION), id.id).withConverter(studentConverter);
        return updateDoc(studentRef, {
            classIdList: arrayRemove(classId.id),
        }).then(() => true).catch(() => false);
    }

    async addStudentWeekIssue(id: StudentId, studentWeekIssue: StudentWeekIssue): Promise<StudentWeekIssue> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION), id.id);
        const studentWeekIssueRef = doc(collection(studentRef, STUDENT_WEEK_ISSUE_COLLECTION))
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
        // TODO: 예외 처리
        await setDoc(studentWeekIssueRef, newStudentWeekIssue).then(() => true).catch(() => false);
        return newStudentWeekIssue;
    }

    async removeStudentWeekIssue(id: StudentId, studentWeekIssueId: StudentWeekIssueId): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION), id.id);
        const studentWeekIssueRef = doc(collection(studentRef, STUDENT_WEEK_ISSUE_COLLECTION), studentWeekIssueId.id);
        return deleteDoc(studentWeekIssueRef).then(() => true).catch(() => false);
    }

    async addTuitionPayment(id: StudentId, tuitionPayment: TuitionPayment): Promise<TuitionPayment> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION), id.id);
        const tuitionPaymentRef = doc(collection(studentRef, TUITION_PAYMENT_COLLECTION))
            .withConverter(tuitionPaymentConverter);
        const newTuitionPayment = new TuitionPayment(
            new TuitionPaymentId(tuitionPaymentRef.id),
            tuitionPayment.studentId,
            tuitionPayment.amount,
            tuitionPayment.paymentDate
        );
        // TODO: 예외 처리
        await setDoc(tuitionPaymentRef, newTuitionPayment).then(() => true).catch(() => false);
        return newTuitionPayment;
    }

    async removeTuitionPayment(id: StudentId, tuitionPaymentId: TuitionPaymentId): Promise<boolean> {
        const studentRef = doc(collection(db, STUDENT_COLLECTION), id.id);
        const tuitionPaymentRef = doc(collection(studentRef, TUITION_PAYMENT_COLLECTION), tuitionPaymentId.id);
        return deleteDoc(tuitionPaymentRef).then(() => true).catch(() => false);
    }

}
