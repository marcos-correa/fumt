
import { Vue } from "vue-property-decorator";

class UserService extends Vue{

  getUser(){
    return this.$store.state.Auth.user
  }

  getUserName(){
    return this.$store.state.Auth.user.name
  }

  getUsername(){
    return this.$store.state.Auth.user.username;
  }
  
  getUserID(){
    return this.$store.state.Auth.user.id
  }
}


export default new UserService();
