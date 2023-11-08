import CRUDBase from "./base/CRUDBase";
import TuitionPayment from "../../model/TuitionPayment";
import TuitionPaymentId from "../../model/identifier/TuitionPaymentId";

export default interface TuitionPaymentRepository extends CRUDBase<TuitionPayment, TuitionPaymentId>{
    
}
