import StudentRepository from "../repository/interface/StudentRepository";
import StudentRepositoryImpl from "../repository/firebase/StudentRepositoryImpl";
import Student from "../model/Student";
import StudentId from "../model/identifier/StudentId";

export default class StudentService {

    private _studentRepository: StudentRepository;

    constructor() {
        this._studentRepository = new StudentRepositoryImpl();
    }

    public async getStudent(id: StudentId): Promise<Student | null> {
        return await this._studentRepository.get(id);
    }

    public async getAllStudent(): Promise<Array<Student>> {
        return await this._studentRepository.getAll();
    }



}
