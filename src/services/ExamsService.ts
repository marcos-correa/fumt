import { AnswerExam } from "@/interfaces/answerexam.interface";
import { Exam } from "@/interfaces/exam.interface";
import axios from "axios";

const API_URL = 'http://localhost:3000/exams'
const API_URL_ANSWER = 'http://localhost:3000/answers'

class ExamsSertvice{
  trueLogin = true
  examToAnswer!: Exam;

  setCurrentExam(exam:string){
    this.examToAnswer = JSON.parse(exam)
  }
  getCurrentExam(): Exam{
    return this.examToAnswer
  }
  async getAllExams(){
    return await axios.get(API_URL)
    .then(response =>{
      // localStorage.setItem('user-fumt', JSON.stringify(response.data));
      // if(response.data.accessTokes){
        // localStorage.setItem('user-fumt', JSON.stringify(response.data));
      // }
      return response.data;
    })
  }

  // async 
  async createExam(data:any): Promise<any>{
    return await axios.post(API_URL, data)
    .then(response =>{
      return response.data;
    })
  }
  async deleteExamByID(id:string){
    return await axios.delete(`${API_URL}/${id}`)
    .then(response =>{
      return response.data;
    })
  }

  async getExamByID(id:string){
    return await axios.get(`${API_URL}/${id}`)
    .then(response =>{
      return response.data;
    })
  }
  async getExamToAnswer(id:string){
  return await axios.get(`${API_URL}/getExamToAnswer/${id}`)
    .then(response =>{
      this.examToAnswer = response.data
      return response.data;
    })
  }

  async createAnswerExam(data:AnswerExam){
    return await axios.post(API_URL_ANSWER,data)
    .then(response =>{
      return response.data;
    })
  }

  async getAnswerExamByID(id:string){
    return await axios.get(`${API_URL_ANSWER}/${id}`)
    .then(response =>{
      return response.data;
    })
  }

  async getAnswredExamsByStudentId(id:any){
    return await axios.get(`${API_URL_ANSWER}/getAnswredExamsByStudentId/${id}`)
    .then(response =>{
      return response.data;
    })
  }

  async getUnansweredExamsByStudentId(id:any){
    return await axios.get(`${API_URL_ANSWER}/getUnansweredExamsByStudentId/${id}`)
    .then(response =>{
      return response.data;
    })
  }

  

}

export default new ExamsSertvice();