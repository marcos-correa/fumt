import { Question } from "./question.interface";

export interface Exam{
  name:String,
  description:String,
  value:Number,
  valuePerQuestion:Number,
  totalQuestions:Number,
  created_at: Date,
  questions: [Question]
}