import StudentRepository from "../repository/interface/StudentRepository";
import Student from "../model/Student";
import StudentRepositoryImpl from "../repository/firebase/StudentRepositoryImpl";

export default class StudentCache {

    private _studentRepository: StudentRepository;
    private _studentListCache: Array<Student>;
    private _lastCreatedStudentDate: Date | null;


    constructor() {
        this._studentRepository = new StudentRepositoryImpl();
        this._studentListCache = [];
        this._lastCreatedStudentDate = null;
    }

    public async getCachedStudentList(): Promise<Array<Student>> {
        const lastCreatedStudent: Student = await this._studentRepository.getLastCreatedStudent();
        if (this._lastCreatedStudentDate === null || this._lastCreatedStudentDate < lastCreatedStudent.createdAt) {
            console.log("cache updated");
            this._lastCreatedStudentDate = lastCreatedStudent.createdAt;
            this._studentListCache = await this._studentRepository.getAll();
        }
        console.log("cache hit: " + this._studentListCache);
        return this._studentListCache;
    }

}
