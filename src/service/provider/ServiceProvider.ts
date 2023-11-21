import ClassService from "../ClassService";
import StudentService from "../StudentService";
import StudentIssueService from "../StudentIssueService";
import StudentCache from "../StudentCache";
import StudentIssueCache from "../StudentIssueCache";

export const classService = new ClassService();
export const studentService = new StudentService();
export const studentCache = new StudentCache();
export const studentIssueService = new StudentIssueService();
export const studentIssueCache = new StudentIssueCache();
