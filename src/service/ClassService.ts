import ClassRepository from "../repository/interface/ClassRepository";
import ClassRepositoryImpl from "../repository/firebase/ClassRepositoryImpl";
import Class from "../model/Class";
import ClassId from "../model/identifier/ClassId";
import Student from "../model/Student";
import StudentId from "../model/identifier/StudentId";
import {lectureService, studentLectureIssueService, studentService} from "./provider/ServiceProvider";
import Lecture from "../model/Lecture";
import LectureId from "../model/identifier/LectureId";
import StudentLectureIssue from "../model/StudentLectureIssue";
import StudentLectureIssueId from "../model/identifier/StudentLectureIssueId";

export default class ClassService {

    private static instance: ClassService;

    private _classRepository: ClassRepository;

    constructor() {
        this._classRepository = new ClassRepositoryImpl();
    }

    public static getInstance() {
        if (!ClassService.instance) ClassService.instance = new ClassService();
        return ClassService.instance;
    }

    public async createClass(classObject: Class): Promise<Class | null> {
        if (await this.classIdIsExist(classObject.id)) return null;
        return await this._classRepository.create(classObject);
    }

    public async getClass(id: ClassId): Promise<Class | null> {
        return await this._classRepository.get(id);
    }

    public async getAllClass(): Promise<Array<Class>> {
        return await this._classRepository.getAll();
    }

    public async getAllClassStudent(id: ClassId): Promise<Array<Student>> {
        return await studentService.getStudentListByClassIdWithCache(id);
    }

    public async classIdIsExist(id: ClassId): Promise<boolean> {
        const classList: Array<Class> = await this.getAllClass();
        for (let classObject of classList) {
            if (classObject.idString === id.id) return true;
        }
        return false;
    }

    public async updateClass(classObject: Class): Promise<boolean> {
        return await this._classRepository.update(classObject);
    }

    public async deleteClass(id: ClassId): Promise<boolean> {
        return await this._classRepository.delete(id);
    }

    public async addStudentId(id: ClassId, studentId: StudentId): Promise<boolean> {
        return await this._classRepository.addStudentId(id, studentId);
    }

    public async removeStudentId(id: ClassId, studentId: StudentId): Promise<boolean> {
        return await this._classRepository.removeStudentId(id, studentId);
    }

    public async addLecture(id: ClassId, lecture: Lecture): Promise<Lecture> {
        const targetClassStudents: Array<Student> = await this.getAllClassStudent(id);
        const newLecture: Lecture = await this._classRepository.addLecture(id, lecture);
        const promiseList: Promise<StudentLectureIssue>[] = [];
        for (let student of targetClassStudents) {
            promiseList.push(this.addStudentLectureIssue(id, new StudentLectureIssue(
                new StudentLectureIssueId("none"), id, newLecture.id, student.id,
                false, false, false, false,
                null, null, null, null
            )));
        }
        await Promise.all(promiseList);
        return newLecture;
    }

    public async removeLecture(id: ClassId, lectureId: LectureId): Promise<boolean> {
        const targetLecture: Lecture | null = await lectureService.getLecture(id, lectureId);
        if (targetLecture === null) return false;
        const studentLectureIssueList: Array<StudentLectureIssue> =
            await studentLectureIssueService.getAllStudentLectureIssueByLectureId(id, lectureId);
        const promiseList: Promise<boolean>[] = [];
        const issueList: Array<any> = ['lateness', 'absence', 'attitude', 'scoreIssue'];
        for (let studentLectureIssue of studentLectureIssueList) {
            for (let issueString of issueList) {
                if (!this.checkIssue(studentLectureIssue, issueString))
                    promiseList.push(studentLectureIssueService.switchIndicator(
                        id, targetLecture, studentLectureIssue, issueString));
            }
            promiseList.push(this.removeStudentLectureIssue(id, studentLectureIssue.id));
        }
        await Promise.all(promiseList);
        return await this._classRepository.removeLecture(id, lectureId);
    }

    private checkIssue(
        studentLectureIssue: StudentLectureIssue,
        targetIssue: 'lateness' | 'absence' | 'attitude' | 'scoreIssue'
    ): boolean {
        switch (targetIssue) {
            case "lateness":
                return studentLectureIssue.lateness;
            case "absence":
                return studentLectureIssue.absence;
            case "attitude":
                return studentLectureIssue.attitude;
            case "scoreIssue":
                return studentLectureIssue.scoreIssue;
        }
    }

    public async addStudentLectureIssue(
        id: ClassId,
        studentLectureIssue: StudentLectureIssue
    ): Promise<StudentLectureIssue> {
        return await this._classRepository.addStudentLectureIssue(id, studentLectureIssue);
    }

    public async removeStudentLectureIssue(
        id: ClassId,
        studentLectureIssueId: StudentLectureIssueId
    ): Promise<boolean> {
        return await this._classRepository.removeStudentLectureIssue(id, studentLectureIssueId);
    }

}