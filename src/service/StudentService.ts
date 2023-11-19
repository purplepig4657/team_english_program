import StudentRepository from "../repository/interface/StudentRepository";
import StudentRepositoryImpl from "../repository/firebase/StudentRepositoryImpl";
import Student from "../model/Student";
import StudentId from "../model/identifier/StudentId";
import StudentWeekIssue from "../model/StudentWeekIssue";
import StudentIssueRepository from "../repository/interface/StudentIssueRepository";
import StudentIssueRepositoryImpl from "../repository/firebase/StudentIssueRepositoryImpl";
import StudentIssue from "../model/StudentIssue";
import StudentIssueId from "../model/identifier/StudentIssueId";

export default class StudentService {

    private static instance: StudentService;
    private _studentRepository: StudentRepository;
    protected _studentIssueRepository: StudentIssueRepository;

    constructor() {
        this._studentRepository = new StudentRepositoryImpl();
        this._studentIssueRepository = new StudentIssueRepositoryImpl();
    }

    public static getInstance() {
        if (!StudentService.instance) StudentService.instance = new StudentService();
        return StudentService.instance;
    }

    public async createStudent(student: Student): Promise<Student> {
        const newStudent: Student = await this._studentRepository.create(student);
        await this._studentIssueRepository.create(new StudentIssue(
            new StudentIssueId("none"),
            newStudent.id,
            0, 0, 0, 0
        ));
        return newStudent
    }

    public async getStudent(id: StudentId): Promise<Student | null> {
        return await this._studentRepository.get(id);
    }

    public async getAllStudent(): Promise<Array<Student>> {
        return await this._studentRepository.getAll();
    }

    public async updateStudent(updatedStudent: Student): Promise<boolean> {
        return await this._studentRepository.update(updatedStudent);
    }

    public async delete(studentId: StudentId): Promise<boolean> {
        return await this._studentRepository.delete(studentId);
    }

    public async addStudentWeekIssue(id: StudentId, studentWeekIssue: StudentWeekIssue): Promise<boolean> {
        return await this._studentRepository.addStudentWeekIssue(id, studentWeekIssue);
    }

}
