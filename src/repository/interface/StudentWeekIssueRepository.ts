import { DocumentReference } from "firebase/firestore";

import StudentWeekIssue from "../../model/StudentWeekIssue";
import StudentId from "../../model/identifier/StudentId";
import StudentWeekIssueId from "../../model/identifier/StudentWeekIssueId";
import WeekId from "../../model/identifier/WeekId";

export default interface StudentWeekIssueRepository {
    get(studentId: StudentId, studentWeekIssueId: StudentWeekIssueId): Promise<StudentWeekIssue | null>;
    getByWeekId(studentId: StudentId, weekId: WeekId): Promise<StudentWeekIssue | null>;
    getAll(studentId: StudentId): Promise<Array<StudentWeekIssue>>;
    update(studentId: StudentId, studentWeekIssue: StudentWeekIssue): Promise<boolean>;

}
