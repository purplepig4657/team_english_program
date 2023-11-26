import LectureRepository from "../repository/interface/LectureRepository";
import LectureRepositoryImpl from "../repository/firebase/LectureRepositoryImpl";
import LectureId from "../model/identifier/LectureId";
import Lecture from "../model/Lecture";
import ClassId from "../model/identifier/ClassId";

export default class LectureService {

    private _lectureRepository: LectureRepository;

    constructor() {
        this._lectureRepository = new LectureRepositoryImpl();
    }

    public async getLecture(classId: ClassId, lectureId: LectureId): Promise<Lecture | null> {
        return await this._lectureRepository.get(classId, lectureId);
    }
}
