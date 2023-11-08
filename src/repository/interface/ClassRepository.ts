import Class from "../../model/Class";
import ClassId from "../../model/identifier/ClassId";
import CRUDBase from "./base/CRUDBase";

export default interface ClassRepository extends CRUDBase<Class, ClassId> {
    
}
