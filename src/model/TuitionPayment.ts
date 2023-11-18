import {
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    Timestamp
} from "firebase/firestore";

import TuitionPaymentId from "./identifier/TuitionPaymentId";
import StudentId from "./identifier/StudentId";

export default class TuitionPayment {
    private readonly _id: TuitionPaymentId;
    private readonly _studentId: StudentId;  // foreign key
    private _amount: number;
    private _paymentDate: Date;

    public constructor(
        id: TuitionPaymentId,
        studentId: StudentId,
        amount: number,
        paymentDate: Date
    ) {
        this._id = id;
        this._studentId = studentId;
        this._amount = amount;
        this._paymentDate = paymentDate;
    }

    // Getter

    get id(): TuitionPaymentId {
        return this._id;
    }

    get studentId(): StudentId {
        return this._studentId;
    }

    get idString(): string {
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
    studentId: string;
    amount: number;
    paymentDate: Timestamp;
}

export const tuitionPaymentConverter: FirestoreDataConverter<TuitionPayment, TuitionPaymentDBModel> = {
    toFirestore: (tuitionPaymentData: TuitionPayment): TuitionPaymentDBModel => {
        return {
            studentId: tuitionPaymentData.studentId.id,
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
            new StudentId(data.studentId),
            data.amount,
            data.paymentDate.toDate()
        );
    },
};
