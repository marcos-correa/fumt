import axios from "axios";

const API_URL = 'http://localhost:3000/auth/'

class AuthService{
  trueLogin = true

  login(username: string, password: string){
    return axios.post(`${API_URL}login`,{
      username,
      password
    })
    .then(response =>{
      localStorage.setItem('user-fumt', JSON.stringify(response.data));
      if(response.data.accessTokes){
        localStorage.setItem('user-fumt', JSON.stringify(response.data));
      }
      return response.data;
    })
  }

  logout() {
    localStorage.removeItem('user-fumt');
  }

  register(name: string, username: string, password: string) {
    return axios.post(`${API_URL}register`, {
      name,
      username,
      password
    });
  }
}

export default new AuthService();