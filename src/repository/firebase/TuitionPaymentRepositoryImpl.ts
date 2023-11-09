import {
    doc, getDoc, getDocs, updateDoc, deleteDoc, collection, setDoc,
    DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot
} from "firebase/firestore";

import { db } from "../../config/firebaseConfig";

import TuitionPaymentRepository from "../interface/TuitionPaymentRepository";
import TuitionPayment, { tuitionPaymentConverter } from "../../model/TuitionPayment";
import TuitionPaymentId from "../../model/identifier/TuitionPaymentId";

export default class TuitionPaymentRepositoryImpl implements TuitionPaymentRepository {

    private COLLECTION_NAME = "tuition_payments";

    async create(t: TuitionPayment): Promise<TuitionPayment> {
        const newPaymentRef = doc(collection(db, this.COLLECTION_NAME)).withConverter(tuitionPaymentConverter);
        const newPaymentId: string = newPaymentRef.id;
        const newPayment = new TuitionPayment(
            new TuitionPaymentId(newPaymentId),
            t.amount,
            t.paymentDate
        );
        await setDoc(newPaymentRef, newPayment);
        return newPayment;
    }

    async get(id: TuitionPaymentId): Promise<TuitionPayment | null> {
        const paymentRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(tuitionPaymentConverter);
        const paymentSnap: DocumentSnapshot<TuitionPayment> = await getDoc(paymentRef);
        if (paymentSnap.exists()) return paymentSnap.data();
        else return null;
    }

    async getAll(): Promise<Array<TuitionPayment>> {
        const paymentListSnap: QuerySnapshot = await getDocs(collection(db, this.COLLECTION_NAME));
        const result: Array<TuitionPayment> = new Array<TuitionPayment>();
        paymentListSnap.forEach((paymentDBModel: QueryDocumentSnapshot) => {
            result.push(tuitionPaymentConverter.fromFirestore(paymentDBModel));
        });
        return result;
    }

    async update(t: TuitionPayment): Promise<boolean> {
        const paymentRef = doc(collection(db, this.COLLECTION_NAME), t.id).withConverter(tuitionPaymentConverter);
        const updateModel = tuitionPaymentConverter.toFirestore(t);
        return updateDoc(paymentRef, {
            ...updateModel
        }).then(() => true).catch(() => false);
    }

    async delete(id: TuitionPaymentId): Promise<boolean> {
        const paymentRef = doc(collection(db, this.COLLECTION_NAME), id.id).withConverter(tuitionPaymentConverter);
        return deleteDoc(paymentRef).then(() => true).catch(() => false);
    }
}
