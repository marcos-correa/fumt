import { User } from './../interfaces/user.interface';
import { Vue } from "vue-property-decorator";
import axios from "axios";

const API_URL = process.env.VUE_APP_FUMT_API_LINK+'/users'

axios.create({
  baseURL: process.env.BASE_URL_API
})
class UserService extends Vue{
  user!:User

  setUser(user:any){
    this.user = user
  }
  getUser(){
    return this.user
  }

  getNameUser(){
    return this.user.name
  }

  getUsername(){
    return this.user.username;
  }
  
  getUserID(){
    return this.user.id
  }

  async createUser(user:User){
    console.log('var local',process.env.BASE_URL_API)
    console.log('var local',process.env.VUE_APP_FUMT_API_LINK)
    return await axios.post(API_URL, user)
    .then(response =>{
      return response.data;
    })
  }
}


export default new UserService();
