import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    Timestamp
} from "firebase/firestore";

import TuitionPaymentId from "./identifier/TuitionPaymentId";

export default class TuitionPayment {
    private readonly _id: TuitionPaymentId;
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

interface TuitionPaymentDBModel extends DocumentData {
    amount: number;
    paymentDate: Timestamp;
}

export const tuitionPaymentConverter: FirestoreDataConverter<TuitionPayment, TuitionPaymentDBModel> = {
    toFirestore: (tuitionPaymentData: TuitionPayment): TuitionPaymentDBModel => {
        return {
            id: tuitionPaymentData.id,
            amount: tuitionPaymentData.amount,
            paymentDate: Timestamp.fromDate(tuitionPaymentData.paymentDate),
        };
    },
    fromFirestore: (
        snapshot: QueryDocumentSnapshot<TuitionPaymentDBModel, TuitionPaymentDBModel>,
        options?: SnapshotOptions
    ): TuitionPayment => {
        const data = snapshot.data(options);
        return new TuitionPayment(
            new TuitionPaymentId(snapshot.id),
            data.amount,
            data.paymentDate.toDate()
        );
    },
};


