import ClassWeek from "../../model/ClassWeek";
import ClassWeekId from "../../model/identifier/ClassWeekId";
import CRUDBase from "./base/CRUDBase";
import LectureId from "../../model/identifier/LectureId";

export default interface ClassWeekRepository extends CRUDBase<ClassWeek, ClassWeekId> {
    getAll(): Promise<Array<ClassWeek>>;
    pushLectureList(id: ClassWeekId, lectureId: LectureId): Promise<boolean>;
    removeLectureList(id: ClassWeekId, lectureId: LectureId): Promise<boolean>;

}
