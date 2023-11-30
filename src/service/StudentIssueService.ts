import StudentIssueRepository from "../repository/interface/StudentIssueRepository";
import StudentIssueRepositoryImpl from "../repository/firebase/StudentIssueRepositoryImpl";
import StudentIssue from "../model/StudentIssue";
import Student from "../model/Student";
import {studentIssueCache, studentService} from "./provider/ServiceProvider";
import StudentId from "../model/identifier/StudentId";
import StudentIssueId from "../model/identifier/StudentIssueId";

export default class StudentIssueService {

    private static instance: StudentIssueService;

    private _studentIssueRepository: StudentIssueRepository;

    constructor() {
        this._studentIssueRepository = new StudentIssueRepositoryImpl();
    }

    public static getInstance() {
        if (!StudentIssueService.instance) StudentIssueService.instance = new StudentIssueService();
        return StudentIssueService.instance;
    }

    public async getAllIssueStudentList(): Promise<Array<[Student, StudentIssue]>> {
        const studentIssueList: Array<StudentIssue> = await studentIssueCache.getCachedStudentList();
        const issuedStudentIssueList: Array<StudentIssue> = studentIssueList.filter(
            (studentIssue) => studentIssue.isIssueStudent()
        );
        return Promise.all(issuedStudentIssueList.map(async (studentIssue) =>
            [await studentService.getStudent(studentIssue.studentId) as Student, studentIssue]
        ));
    }

    public async getStudentIssueByStudentId(studentId: StudentId): Promise<StudentIssue | null> {
        const studentIssueList: Array<StudentIssue> = await studentIssueCache.getCachedStudentList();
        for (let studentIssue of studentIssueList) {
            if (studentIssue.studentId.id === studentId.id) return studentIssue;
        }
        return null;
    }

    public async createStudentIssue(studentIssue: StudentIssue): Promise<StudentIssue> {
        return await this._studentIssueRepository.create(studentIssue);
    }

    public async updateStudentIssue(updatedStudentIssue: StudentIssue): Promise<boolean> {
        return await this._studentIssueRepository.update(updatedStudentIssue);
    }
    
    public async deleteStudentIssue(studentIssueId: StudentIssueId): Promise<boolean> {
        return await this._studentIssueRepository.delete(studentIssueId);
    }

    public async deleteStudentIssueByStudentId(studentId: StudentId): Promise<boolean> {
        const targetStudentIssue: StudentIssue | null = await this.getStudentIssueByStudentId(studentId);
        if (targetStudentIssue === null) return false;
        return await this.deleteStudentIssue(targetStudentIssue.id);
    }

    public async deleteStudentIssueBothStoreAndCacheByStudentId(studentId: StudentId): Promise<Array<StudentIssue>> {
        const targetStudentIssue: StudentIssue | null = await this.getStudentIssueByStudentId(studentId);
        if (targetStudentIssue === null) return await studentIssueCache.getCachedStudentList();
        const isSuccess: boolean = await this.deleteStudentIssue(targetStudentIssue.id);
        if (isSuccess) return studentIssueCache.removeStudentIssueCacheById(targetStudentIssue.id);
        else return await studentIssueCache.getCachedStudentList();
    }

}
