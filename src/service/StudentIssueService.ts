import StudentIssueRepository from "../repository/interface/StudentIssueRepository";
import StudentIssueRepositoryImpl from "../repository/firebase/StudentIssueRepositoryImpl";
import StudentIssue from "../model/StudentIssue";
import Student from "../model/Student";
import {studentIssueCache, studentService} from "./provider/ServiceProvider";

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

    public async createStudentIssue(studentIssue: StudentIssue): Promise<StudentIssue> {
        return await this._studentIssueRepository.create(studentIssue);
    }
}
