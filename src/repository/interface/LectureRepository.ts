import CRUDBase from "./base/CRUDBase";
import Lecture from "../../model/Lecture";
import LectureId from "../../model/identifier/LectureId";

export default interface LectureRepository extends CRUDBase<Lecture, LectureId>{
    
}
