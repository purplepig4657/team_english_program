import StudentWeekIssueRepository from "../repository/interface/StudentWeekIssueRepository";
import StudentWeekIssueRepositoryImpl from "../repository/firebase/StudentWeekIssueRepositoryImpl";
import StudentId from "../model/identifier/StudentId";
import WeekId from "../model/identifier/WeekId";
import StudentWeekIssue from "../model/StudentWeekIssue";

export default class StudentWeekIssueService {

    private _studentWeekIssueRepository: StudentWeekIssueRepository;


    constructor() {
        this._studentWeekIssueRepository = new StudentWeekIssueRepositoryImpl();
    }

    public async getStudentWeekIssueByWeekId(studentId: StudentId, weekId: WeekId): Promise<StudentWeekIssue | null> {
        return await this._studentWeekIssueRepository.getByWeekId(studentId, weekId);
    }

    public async getAllStudentWeekIssue(studentId: StudentId): Promise<Array<StudentWeekIssue>> {
        return await this._studentWeekIssueRepository.getAll(studentId);
    }

    public async updateStudentWeekIssue(studentId: StudentId, updatedStudentWeekIssue: StudentWeekIssue): Promise<boolean> {
        return await this._studentWeekIssueRepository.update(studentId, updatedStudentWeekIssue);
    }

}
