import {
    doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, arrayUnion, arrayRemove, collection,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot,
} from "firebase/firestore"

import { db } from "../../config/firebaseConfig";

import ClassRepository from "../interface/ClassRepository";
import Class, { classConverter } from "../../model/Class";
import ClassId from "../../model/identifier/ClassId";
import ClassWeekId from "../../model/identifier/ClassWeekId";
import StudentId from "../../model/identifier/StudentId";

export default class ClassRepositoryImpl implements ClassRepository {

    private COLLECTION_NAME = "classes";

    async create(t: Class): Promise<Class> {
        const newClassRef = doc(collection(db, this.COLLECTION_NAME)).withConverter(classConverter);
        const newClassId: ClassId = new ClassId(newClassRef.id);
        const newClass: Class = new Class(
            newClassId,
            new Array<ClassWeekId>(),
            new Array<StudentId>()
        );
        await setDoc(newClassRef, newClass);
        return newClass;
    }

    async get(id: ClassId): Promise<Class | null> {
        const classRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(classConverter);
        const classSnap: DocumentSnapshot<Class> = await getDoc(classRef);
        if (classSnap.exists()) return classSnap.data();
        else return null;
    }

    async getAll(): Promise<Array<Class>> {
        const classListSnap: QuerySnapshot = await getDocs(collection(db, this.COLLECTION_NAME));
        const result: Array<Class> = new Array<Class>();
        classListSnap.forEach((classDBModel: QueryDocumentSnapshot) => {
            result.push(classConverter.fromFirestore(classDBModel));
        });
        return result;
    }

    async update(t: Class): Promise<boolean> {
        const classRef = doc(collection(db, this.COLLECTION_NAME), t.id).withConverter(classConverter);
        const updateModel = classConverter.toFirestore(t);
        return updateDoc(classRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

    async delete(id: ClassId): Promise<boolean> {
        const classRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(classConverter);
        return deleteDoc(classRef).then(() => true).catch(() => false);
    }

    async pushClassWeekList(id: ClassId, classWeekId: ClassWeekId): Promise<boolean> {
        const classRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(classConverter);
        return updateDoc(classRef, {
            classWeekIdList: arrayUnion(classWeekId.id)
        }).then(() => true).catch(() => false);
    }

    async removeClassWeekList(id: ClassId, classWeekId: ClassWeekId): Promise<boolean> {
        const classRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(classConverter);
        return updateDoc(classRef, {
            classWeekIdList: arrayRemove(classWeekId.id)
        }).then(() => true).catch(() => false);
    }

    async pushStudentList(id: ClassId, studentId: StudentId): Promise<boolean> {
        const classRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(classConverter);
        return updateDoc(classRef, {
            studentIdList: arrayUnion(studentId.id)
        }).then(() => true).catch(() => false);
    }

    async removeStudentList(id: ClassId, studentId: StudentId): Promise<boolean> {
        const classRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(classConverter);
        return updateDoc(classRef, {
            studentIdList: arrayRemove(studentId.id)
        }).then(() => true).catch(() => false);
    }
}
