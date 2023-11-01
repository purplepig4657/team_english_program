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
