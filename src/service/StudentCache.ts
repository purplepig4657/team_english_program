import StudentRepository from "../repository/interface/StudentRepository";
import Student from "../model/Student";
import StudentRepositoryImpl from "../repository/firebase/StudentRepositoryImpl";
import StudentId from "../model/identifier/StudentId";

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
            this._lastCreatedStudentDate = lastCreatedStudent.updatedAt;
            this._studentListCache = await this._studentRepository.getAll();
        }
        console.log("cache hit: " + this._studentListCache);
        return this._studentListCache;
    }

    public async cacheReload(): Promise<Array<Student>> {
        this._studentListCache = await this._studentRepository.getAll();
        return this._studentListCache;
    }

    public updateStudentCache(updatedStudent: Student): boolean {
        const targetStudent: Student | undefined = this._studentListCache.find(
            (student: Student) => student.idString === updatedStudent.idString
        );
        if (targetStudent === undefined) return false;
        targetStudent.changeName(updatedStudent.name);
        targetStudent.changeClassIdList(updatedStudent.classIdList);
        targetStudent.changeUpdatedAt(updatedStudent.updatedAt);
        return true;
    }

    public removeStudentCacheById(studentId: StudentId): Array<Student> {
        this._studentListCache = this._studentListCache.filter((student: Student) => student.idString !== studentId.id);
        return this._studentListCache;
    }

}
