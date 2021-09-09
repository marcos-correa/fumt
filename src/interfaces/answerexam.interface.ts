import { Exam } from "./exam.interface";

export interface AnswerExam{
  examID:string,
  studentID?:string,
  studentName:string,
  note:Number,
  answered_at: Date,
  exam: Exam
}