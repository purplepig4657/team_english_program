import ClassId from "./identifier/ClassId";
import StudentId from "./identifier/StudentId";
import StudentWeekIssueId from "./identifier/StudentWeekIssueId";
import TuitionPaymentId from "./identifier/TuitionPaymentId";

export default class Student {
    private _id: StudentId;
    private _classIdList: Array<ClassId>;
    private _name: string;
    private _studentWeekIssueIdList: Array<StudentWeekIssueId>;
    private _tuitionPaymentIdList: Array<TuitionPaymentId>;
    
    constructor(
        id: StudentId, 
        classIdList: Array<ClassId>, 
        name: string, 
        studentWeekIssueIdList: Array<StudentWeekIssueId>, 
        tuitionPaymentIdList: Array<TuitionPaymentId>
    ) {
        this._id = id;
        this._classIdList = classIdList;
        this._name = name;
        this._studentWeekIssueIdList = studentWeekIssueIdList;
        this._tuitionPaymentIdList = tuitionPaymentIdList;
    }

    // Getter

    get idObject(): StudentId {
        return this._id;
    }

    get id(): String {
        return this._id.id;
    }

    get classIdList(): Array<ClassId> {
        return this._classIdList;
    }

    get name(): string {
        return this._name;
    }

    get studentWeekIssueIdList(): Array<StudentWeekIssueId> {
        return this._studentWeekIssueIdList;
    }

    get tuitionPaymentIdList(): Array<TuitionPaymentId> {
        return this._tuitionPaymentIdList;
    }
}
