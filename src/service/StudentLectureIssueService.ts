import StudentLectureIssueRepository from "../repository/interface/StudentLectureIssueRepository";
import StudentLectureIssueRepositoryImpl from "../repository/firebase/StudentLectureIssueRepositoryImpl";
import ClassId from "../model/identifier/ClassId";
import LectureId from "../model/identifier/LectureId";
import StudentLectureIssue from "../model/StudentLectureIssue";
import Lecture from "../model/Lecture";
import StudentWeekIssue from "../model/StudentWeekIssue";
import {studentIssueService, studentService, studentWeekIssueService} from "./provider/ServiceProvider";
import StudentIssue from "../model/StudentIssue";
import StudentWeekIssueId from "../model/identifier/StudentWeekIssueId";
import StudentId from "../model/identifier/StudentId";
import WeekId from "../model/identifier/WeekId";

export default class StudentLectureIssueService {

    private _studentLectureIssueRepository: StudentLectureIssueRepository;

    constructor() {
        this._studentLectureIssueRepository = new StudentLectureIssueRepositoryImpl();
    }

    public async getAllStudentLectureIssueByLectureId(
        classId: ClassId,
        lectureId: LectureId
    ): Promise<Array<StudentLectureIssue>> {
        return await this._studentLectureIssueRepository.getAllByLectureId(classId, lectureId);
    }

    public async updateStudentLectureIssue(
        classId: ClassId,
        updatedStudentLectureIssue: StudentLectureIssue
    ): Promise<boolean> {
        return await this._studentLectureIssueRepository.update(classId, updatedStudentLectureIssue);
    }

    private async createNewStudentWeekIssue(studentId: StudentId, weekId: WeekId): Promise<StudentWeekIssue> {
        return await studentService.addStudentWeekIssue(
            studentId,
            new StudentWeekIssue(
                new StudentWeekIssueId("none"),
                studentId,
                weekId,
                0, 0, 0, 0
            )
        );
    }

    public async switchIndicator(
        classId: ClassId,
        targetLecture: Lecture,
        targetStudentLectureIssue: StudentLectureIssue,
        targetIndicator: 'lateness' | 'absence' | 'attitude' | 'scoreIssue'
    ): Promise<boolean> {
        let targetStudentWeekIssue: StudentWeekIssue | null =
            await studentWeekIssueService.getStudentWeekIssueByWeekId(targetStudentLectureIssue.studentId, targetLecture.weekId);
        if (targetStudentWeekIssue === null) {
            targetStudentWeekIssue =
                await this.createNewStudentWeekIssue(targetStudentLectureIssue.studentId, targetLecture.weekId);
        }
        const targetStudentIssue: StudentIssue | null =
            await studentIssueService.getStudentIssueByStudentId(targetStudentLectureIssue.studentId);
        if (targetStudentWeekIssue === null || targetStudentIssue === null) return false;
        switch (targetIndicator) {
            case "lateness":
                targetStudentLectureIssue.switchLateness();
                if (!targetStudentLectureIssue.lateness) {
                    targetStudentWeekIssue.decrementLateness();
                    targetStudentIssue.decrementLateness();
                } else {
                    targetStudentWeekIssue.incrementLateness();
                    targetStudentIssue.incrementLateness();
                }
                break;
            case "absence":
                targetStudentLectureIssue.switchAbsence();
                if (!targetStudentLectureIssue.absence) {
                    targetStudentWeekIssue.decrementAbsence();
                    targetStudentIssue.decrementAbsence();
                } else {
                    targetStudentWeekIssue.incrementAbsence();
                    targetStudentIssue.incrementAbsence();
                }
                break;
            case "attitude":
                targetStudentLectureIssue.switchAttitude();
                if (!targetStudentLectureIssue.attitude) {
                    targetStudentWeekIssue.decrementAttitude();
                    targetStudentIssue.decrementAttitude();
                } else {
                    targetStudentWeekIssue.incrementAttitude();
                    targetStudentIssue.incrementAttitude();
                }
                break;
            case "scoreIssue":
                targetStudentLectureIssue.switchScoreIssue();
                if (!targetStudentLectureIssue.scoreIssue) {
                    targetStudentWeekIssue.decrementScoreIssue();
                    targetStudentIssue.decrementScoreIssue();
                } else {
                    targetStudentWeekIssue.incrementScoreIssue();
                    targetStudentIssue.incrementScoreIssue();
                }
        }
        // TODO: Transaction 처리
        const first = await studentWeekIssueService.updateStudentWeekIssue(
            targetStudentLectureIssue.studentId, targetStudentWeekIssue
        );
        const second = await studentIssueService.updateStudentIssue(targetStudentIssue);
        const last = await this.updateStudentLectureIssue(classId, targetStudentLectureIssue);
        return first && second && last;
    }

}
