import { User } from './../interfaces/user.interface';

import { Vue } from "vue-property-decorator";
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
}


export default new UserService();
