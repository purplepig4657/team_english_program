import StudentRepository from "../repository/interface/StudentRepository";
import StudentRepositoryImpl from "../repository/firebase/StudentRepositoryImpl";
import Student from "../model/Student";
import StudentId from "../model/identifier/StudentId";
import StudentWeekIssue from "../model/StudentWeekIssue";
import StudentIssue from "../model/StudentIssue";
import StudentIssueId from "../model/identifier/StudentIssueId";
import ClassId from "../model/identifier/ClassId";
import {studentCache, studentIssueService} from "./provider/ServiceProvider";

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
        // TODO: Transaction 처리
        const newStudent: Student = await this._studentRepository.create(student);
        // await Promise.all(student.classIdList.map(
        //     (classId) => [classService.addStudentId(classId, newStudent.id)]
        // ));
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

    public async getAllStudentByIdListWithCache(idList: Array<StudentId>): Promise<Array<Student>> {
        const studentList: Array<Student> = await this.getAllStudent();
        const idStringList: Array<string> = idList.map((studentId: StudentId) => studentId.id);
        return studentList.filter((student: Student) => idStringList.includes(student.idString));
    }

    public async getAllStudent(): Promise<Array<Student>> {
        return await studentCache.getCachedStudentList();
    }

    public async updateStudent(updatedStudent: Student): Promise<boolean> {
        updatedStudent.changeUpdatedAt();
        return await this._studentRepository.update(updatedStudent);
    }

    public async updateStudentBothStoreAndCache(updatedStudent: Student): Promise<boolean> {
        updatedStudent.changeUpdatedAt();
        const isSuccess: boolean = await this._studentRepository.update(updatedStudent);
        if (isSuccess) {
            if (!studentCache.updateStudentCache(updatedStudent)) await studentCache.cacheReload();
        }
        return isSuccess;
    }

    public async deleteStudent(studentId: StudentId): Promise<boolean> {
        // const targetStudent: Student | null = await this.getStudent(studentId);
        // if (targetStudent === null) return false;
        // await Promise.all(targetStudent.classIdList.map(
        //     (classId) => [classService.removeStudentId(classId, targetStudent.id)]
        // ));
        // TODO: Transaction 처리
        await studentIssueService.getStudentIssueByStudentId(studentId);
        return await this._studentRepository.delete(studentId);
    }

    public async deleteStudentBothStoreAndCache(studentId: StudentId): Promise<Array<Student>> {
        // TODO: Transaction 처리
        const isSuccess = await this.deleteStudent(studentId);
        await studentIssueService.deleteStudentIssueBothStoreAndCacheByStudentId(studentId);
        if (isSuccess) return studentCache.removeStudentCacheById(studentId);
        else return await studentCache.getCachedStudentList();
    }

    public async addStudentWeekIssue(id: StudentId, studentWeekIssue: StudentWeekIssue): Promise<StudentWeekIssue> {
        return await this._studentRepository.addStudentWeekIssue(id, studentWeekIssue);
    }

}
