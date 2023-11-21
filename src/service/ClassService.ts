import ClassRepository from "../repository/interface/ClassRepository";
import ClassRepositoryImpl from "../repository/firebase/ClassRepositoryImpl";
import Class from "../model/Class";
import ClassId from "../model/identifier/ClassId";
import Student from "../model/Student";
import StudentId from "../model/identifier/StudentId";
import {studentService} from "./provider/ServiceProvider";

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
        return await studentService.getStudentListByClassId(id);
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

}
