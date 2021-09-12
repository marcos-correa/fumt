import axios from "axios";

const API_URL = process.env.VUE_APP_FUMT_API_LINK+'/exams'

class StudentExamService{
  trueLogin = true

  async answerExamById(id:string){
    return await axios.get(`${API_URL}/${id}/answerExamById`)
    .then(response =>{
      return response.data;
    })
  }

  

}

export default new StudentExamService();