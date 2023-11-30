import LectureRepository from "../repository/interface/LectureRepository";
import LectureRepositoryImpl from "../repository/firebase/LectureRepositoryImpl";
import LectureId from "../model/identifier/LectureId";
import Lecture from "../model/Lecture";
import ClassId from "../model/identifier/ClassId";
import WeekId from "../model/identifier/WeekId";

export default class LectureService {

    private _lectureRepository: LectureRepository;

    constructor() {
        this._lectureRepository = new LectureRepositoryImpl();
    }

    public async getLecture(classId: ClassId, lectureId: LectureId): Promise<Lecture | null> {
        return await this._lectureRepository.get(classId, lectureId);
    }

    public async getAllLectureListByClassId(classId: ClassId): Promise<Array<Lecture>> {
        return await this._lectureRepository.getAll(classId);
    }

    public async getAllLectureListByClassIdAndWeekId(classId: ClassId, weekId: WeekId): Promise<Array<Lecture>> {
        return await this._lectureRepository.getAllByWeekId(classId, weekId);
    }

}
