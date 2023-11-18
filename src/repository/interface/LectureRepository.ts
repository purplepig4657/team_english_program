import Lecture from "../../model/Lecture";
import ClassId from "../../model/identifier/ClassId";
import LectureId from "../../model/identifier/LectureId";

export default interface LectureRepository {
    get(classId: ClassId, lectureId: LectureId): Promise<Lecture | null>;
    getAll(classId: ClassId): Promise<Array<Lecture>>;
    update(classId: ClassId, lecture: Lecture): Promise<boolean>;

}
