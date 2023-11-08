import firebase from "firebase/compat";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
import SnapshotOptions = firebase.firestore.SnapshotOptions;

import TuitionPaymentId from "./identifier/TuitionPaymentId";

export default class TuitionPayment {
    private _id: TuitionPaymentId;
    private _amount: number;
    private _paymentDate: Date;

    public constructor(id: TuitionPaymentId, amount: number, paymentDate: Date) {
        this._id = id;
        this._amount = amount;
        this._paymentDate = paymentDate;
    }

    // Getter

    get idObject(): TuitionPaymentId {
        return this._id;
    }

    get id(): string {
        return this._id.id;
    }

    get amount(): number {
        return this._amount;
    }

    get paymentDate(): Date {
        return this._paymentDate;
    }
}

export const tuitionPaymentConverter = {
    toFirestore: (tuitionPaymentData: TuitionPayment) => {
        return {
            id: tuitionPaymentData.id,
            amount: tuitionPaymentData.amount,
            paymentDate: tuitionPaymentData.paymentDate,
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
        const data = snapshot.data(options);
        return new TuitionPayment(
            data.id,
            data.amount,
            data.paymentDate.toDate() // Convert Firestore Timestamp to JavaScript Date
        );
    }
}
