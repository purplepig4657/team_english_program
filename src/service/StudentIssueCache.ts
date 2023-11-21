import StudentIssueRepository from "../repository/interface/StudentIssueRepository";
import StudentIssue from "../model/StudentIssue";
import StudentIssueRepositoryImpl from "../repository/firebase/StudentIssueRepositoryImpl";

export default class StudentIssueCache {

    private _studentIssueRepository: StudentIssueRepository;
    private _studentIssueListCache: Array<StudentIssue>;
    private _lastUpdatedStudentIssueDate: Date | null;


    constructor() {
        this._studentIssueRepository = new StudentIssueRepositoryImpl();
        this._studentIssueListCache = [];
        this._lastUpdatedStudentIssueDate = null;
    }

    public async getCachedStudentList(): Promise<Array<StudentIssue>> {
        const lastUpdatedStudentIssue: StudentIssue = await this._studentIssueRepository.getLastUpdatedStudentIssue();
        if (this._lastUpdatedStudentIssueDate === null || this._lastUpdatedStudentIssueDate < lastUpdatedStudentIssue.updateAt) {
            console.log("cache updated");
            this._lastUpdatedStudentIssueDate = lastUpdatedStudentIssue.updateAt;
            this._studentIssueListCache = await this._studentIssueRepository.getAll();
        }
        console.log("cache hit: " + this._studentIssueListCache);
        return this._studentIssueListCache;
    }

}
