import {
    doc, getDoc, getDocs, updateDoc, collection,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot, query, orderBy, DocumentReference
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

import TuitionPaymentRepository from "../interface/TuitionPaymentRepository";
import TuitionPayment, { tuitionPaymentConverter } from "../../model/TuitionPayment";
import TuitionPaymentId from "../../model/identifier/TuitionPaymentId";
import StudentId from "../../model/identifier/StudentId";
import {STUDENT_COLLECTION, TUITION_PAYMENT_COLLECTION} from "../common/firebaseCollectionNames";

export default class TuitionPaymentRepositoryImpl implements TuitionPaymentRepository {

    async get(id: StudentId | DocumentReference, tuitionPaymentId: TuitionPaymentId): Promise<TuitionPayment | null> {
        console.log("TuitionPaymentRepositoryImpl read");
        const studentRef = id instanceof StudentId ? doc(collection(db, STUDENT_COLLECTION), id.id) : id;
        const tuitionPaymentRef = doc(collection(studentRef, TUITION_PAYMENT_COLLECTION), tuitionPaymentId.id)
            .withConverter(tuitionPaymentConverter);
        const tuitionPaymentSnap: DocumentSnapshot<TuitionPayment> = await getDoc(tuitionPaymentRef);
        if (tuitionPaymentSnap.exists()) return tuitionPaymentSnap.data();
        else return null;
    }

    async getAll(id: StudentId | DocumentReference): Promise<Array<TuitionPayment>> {
        console.log("TuitionPaymentRepositoryImpl read");
        const studentRef = id instanceof StudentId ? doc(collection(db, STUDENT_COLLECTION), id.id) : id;
        const tuitionPaymentRef = collection(studentRef, TUITION_PAYMENT_COLLECTION);
        const q = query(tuitionPaymentRef, orderBy("paymentDate"));
        const tuitionPaymentListSnap: QuerySnapshot = await getDocs(q);
        const result: Array<TuitionPayment> = new Array<TuitionPayment>();
        tuitionPaymentListSnap.forEach((tuitionPaymentDBModel: QueryDocumentSnapshot) => {
            result.push(tuitionPaymentConverter.fromFirestore(tuitionPaymentDBModel));
        });
        return result;
    }

    async update(id: StudentId | DocumentReference, tuitionPayment: TuitionPayment): Promise<boolean> {
        const studentRef = id instanceof StudentId ? doc(collection(db, STUDENT_COLLECTION), id.id) : id;
        const tuitionPaymentRef = doc(collection(studentRef, TUITION_PAYMENT_COLLECTION), tuitionPayment.idString);
        const updateModel = tuitionPaymentConverter.toFirestore(tuitionPayment);
        return updateDoc(tuitionPaymentRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

}
