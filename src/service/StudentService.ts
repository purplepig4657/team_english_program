import StudentRepository from "../repository/interface/StudentRepository";
import StudentRepositoryImpl from "../repository/firebase/StudentRepositoryImpl";
import Student from "../model/Student";
import StudentId from "../model/identifier/StudentId";
import StudentWeekIssue from "../model/StudentWeekIssue";
import StudentIssue from "../model/StudentIssue";
import StudentIssueId from "../model/identifier/StudentIssueId";
import ClassId from "../model/identifier/ClassId";
import {classService, studentCache, studentIssueService} from "./provider/ServiceProvider";

export default class StudentService {

    private static instance: StudentService;
    private _studentRepository: StudentRepository;

    constructor() {
        this._studentRepository = new StudentRepositoryImpl();
    }

    public static getInstance() {
        if (!StudentService.instance) StudentService.instance = new StudentService();
        return StudentService.instance;
    }

    public async createStudent(student: Student): Promise<Student> {
        const newStudent: Student = await this._studentRepository.create(student);
        await Promise.all(student.classIdList.map(
            (classId) => [classService.addStudentId(classId, newStudent.id)]
        ));
        await studentIssueService.createStudentIssue(new StudentIssue(
            new StudentIssueId("none"),
            newStudent.id,
            0, 0, 0, 0, 0, new Date()
        ));
        return newStudent
    }

    public async getStudent(id: StudentId): Promise<Student | null> {
        return await this._studentRepository.get(id);
    }

    /**
     * @deprecated
     */
    public async getStudentListByClassId(id: ClassId): Promise<Array<Student>> {
        return await this._studentRepository.getAllByClassId(id);
    }


    public async getStudentListByClassIdWithCache(id: ClassId): Promise<Array<Student>> {
        const studentList: Array<Student> = await this.getAllStudent();
        const classStudentList: Array<Student> = [];
        for (let student of studentList) {
            if (student.classIdList.map((classId) => classId.id === id.id).includes(true))
                classStudentList.push(student);
        }
        return classStudentList;
    }

    /**
     * @deprecated
     */
    public async getAllStudentByIdList(idList: Array<StudentId>): Promise<Array<Student>> {
        return await this._studentRepository.getAllByIdList(idList);
    }



    public async getAllStudent(): Promise<Array<Student>> {
        return await studentCache.getCachedStudentList();
    }

    public async updateStudent(updatedStudent: Student): Promise<boolean> {
        return await this._studentRepository.update(updatedStudent);
    }

    public async deleteStudent(studentId: StudentId): Promise<boolean> {
        return await this._studentRepository.delete(studentId);
    }

    public async addStudentWeekIssue(id: StudentId, studentWeekIssue: StudentWeekIssue): Promise<StudentWeekIssue> {
        return await this._studentRepository.addStudentWeekIssue(id, studentWeekIssue);
    }

}
