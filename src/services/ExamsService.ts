import axios from "axios";

const API_URL = 'http://localhost:3000/exams'

class ExamsSertvice{
  trueLogin = true

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

}

export default new ExamsSertvice();