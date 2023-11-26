import ClassService from "../ClassService";
import StudentService from "../StudentService";
import StudentIssueService from "../StudentIssueService";
import StudentCache from "../StudentCache";
import StudentIssueCache from "../StudentIssueCache";
import StudentWeekIssueService from "../StudentWeekIssueService";
import LectureService from "../LectureService";
import StudentLectureIssueService from "../StudentLectureIssueService";

export const classService = new ClassService();
export const studentService = new StudentService();
export const studentCache = new StudentCache();
export const studentIssueService = new StudentIssueService();
export const studentIssueCache = new StudentIssueCache();
export const studentWeekIssueService = new StudentWeekIssueService();
export const lectureService = new LectureService();
export const studentLectureIssueService = new StudentLectureIssueService();
