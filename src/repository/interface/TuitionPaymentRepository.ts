import TuitionPayment from "../../model/TuitionPayment";
import StudentId from "../../model/identifier/StudentId";
import TuitionPaymentId from "../../model/identifier/TuitionPaymentId";

export default interface TuitionPaymentRepository {
    get(id: StudentId, tuitionPaymentId: TuitionPaymentId): Promise<TuitionPayment | null>;
    getAll(id: StudentId): Promise<Array<TuitionPayment>>;
    update(id: StudentId, tuitionPayment: TuitionPayment): Promise<boolean>;

}
