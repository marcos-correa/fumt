import axios from "axios";

const API_URL = 'http://localhost:3000/exams'

class ExamsSertvice{
  trueLogin = true

  getAllExams(){
    return axios.get(API_URL)
    .then(response =>{
      // localStorage.setItem('user-fumt', JSON.stringify(response.data));
      // if(response.data.accessTokes){
        // localStorage.setItem('user-fumt', JSON.stringify(response.data));
      // }
      return response.data;
    })
  }
}

export default new ExamsSertvice();