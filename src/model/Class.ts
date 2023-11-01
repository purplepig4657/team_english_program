import ClassId from "./identifier/ClassId";
import ClassWeekId from "./identifier/ClassWeekId";
import StudentId from "./identifier/StudentId";

export default class Class {
    private _id: ClassId;
    private _classWeekIdList: Array<ClassWeekId>;
    private _studentIdList: Array<StudentId>;

    public constructor(id: ClassId, classWeekIdList: Array<ClassWeekId>, studentIdList: Array<StudentId>) {
        this._id = id;
        this._classWeekIdList = classWeekIdList;
        this._studentIdList = studentIdList;
    }
    
    // Getter

    get idObject(): ClassId {
        return this._id;
    }
    
    get id(): string {
        return this._id.id;
    }

    get classWeekIdList(): Array<ClassWeekId> {
        return this._classWeekIdList;
    }

    get studentIdList(): Array<StudentId> {
        return this._studentIdList;
    }
}
