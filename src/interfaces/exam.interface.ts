import { Question } from "./question.interface";

export interface Exam{
  _id:string,
  name:string,
  description:string,
  value:number,
  valuePerQuestion:number,
  totalQuestions:number,
  created_at: Date,
  questions: [Question]
}