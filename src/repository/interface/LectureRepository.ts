import Lecture from "../../model/Lecture";
import ClassId from "../../model/identifier/ClassId";
import LectureId from "../../model/identifier/LectureId";
import WeekId from "../../model/identifier/WeekId";

export default interface LectureRepository {
    get(classId: ClassId, lectureId: LectureId): Promise<Lecture | null>;
    getAll(classId: ClassId): Promise<Array<Lecture>>;
    getAllByWeekId(classId: ClassId, weekId: WeekId): Promise<Array<Lecture>>;
    update(classId: ClassId, lecture: Lecture): Promise<boolean>;

}
