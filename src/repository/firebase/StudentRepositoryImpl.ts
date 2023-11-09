import {
    doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, arrayUnion, arrayRemove, collection,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

import StudentRepository from "../interface/StudentRepository";
import Student, { studentConverter } from "../../model/Student";
import StudentId from "../../model/identifier/StudentId";
import ClassId from "../../model/identifier/ClassId";
import StudentWeekIssueId from "../../model/identifier/StudentWeekIssueId";
import TuitionPaymentId from "../../model/identifier/TuitionPaymentId";

export default class StudentRepositoryImpl implements StudentRepository {

    private COLLECTION_NAME = "students";

    async create(t: Student): Promise<Student> {
        const newStudentRef = doc(collection(db, this.COLLECTION_NAME)).withConverter(studentConverter);
        const newStudentId: string = newStudentRef.id;
        const newStudent = new Student(
            new StudentId(newStudentId),
            t.classIdList,
            t.name,
            t.studentWeekIssueIdList,
            t.tuitionPaymentIdList
        );
        await setDoc(newStudentRef, newStudent);
        return newStudent;
    }

    async get(id: StudentId): Promise<Student | null> {
        const studentRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(studentConverter);
        const studentSnap: DocumentSnapshot<Student> = await getDoc(studentRef);
        if (studentSnap.exists()) return studentSnap.data();
        else return null;
    }

    async getAll(): Promise<Array<Student>> {
        const studentListSnap: QuerySnapshot = await getDocs(collection(db, this.COLLECTION_NAME));
        const result: Array<Student> = new Array<Student>();
        studentListSnap.forEach((studentDBModel: QueryDocumentSnapshot) => {
            result.push(studentConverter.fromFirestore(studentDBModel));
        });
        return result;
    }

    async update(t: Student): Promise<boolean> {
        const studentRef = doc(collection(db, this.COLLECTION_NAME), t.id).withConverter(studentConverter);
        const updateModel = studentConverter.toFirestore(t);
        return updateDoc(studentRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

    async delete(id: StudentId): Promise<boolean> {
        const studentRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(studentConverter);
        return deleteDoc(studentRef).then(() => true).catch(() => false);
    }

    async pushClassList(id: StudentId, classId: ClassId): Promise<boolean> {
        const studentRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(studentConverter);
        return updateDoc(studentRef, {
            classIdList: arrayUnion(classId.id),
        }).then(() => true).catch(() => false);
    }

    async pushStudentWeekIssueList(id: StudentId, studentWeekIssueId: StudentWeekIssueId): Promise<boolean> {
        const studentRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(studentConverter);
        return updateDoc(studentRef, {
            studentWeekIssueIdList: arrayUnion(studentWeekIssueId.id),
        }).then(() => true).catch(() => false);
    }

    async pushTuitionPaymentList(id: StudentId, tuitionPaymentId: TuitionPaymentId): Promise<boolean> {
        const studentRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(studentConverter);
        return updateDoc(studentRef, {
            tuitionPaymentIdList: arrayUnion(tuitionPaymentId.id),
        }).then(() => true).catch(() => false);
    }

    async removeClassList(id: StudentId, classId: ClassId): Promise<boolean> {
        const studentRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(studentConverter);
        return updateDoc(studentRef, {
            classIdList: arrayRemove(classId.id),
        }).then(() => true).catch(() => false);
    }

    async removeStudentWeekIssueList(id: StudentId, studentWeekIssueId: StudentWeekIssueId): Promise<boolean> {
        const studentRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(studentConverter);
        return updateDoc(studentRef, {
            studentWeekIssueIdList: arrayRemove(studentWeekIssueId.id),
        }).then(() => true).catch(() => false);
    }

    async removeTuitionPaymentList(id: StudentId, tuitionPaymentId: TuitionPaymentId): Promise<boolean> {
        const studentRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(studentConverter);
        return updateDoc(studentRef, {
            tuitionPaymentIdList: arrayRemove(tuitionPaymentId.id),
        }).then(() => true).catch(() => false);
    }
}
