<template>
  <div class="user-area">

    <UserArea></UserArea>
    
    <ProfesorExam></ProfesorExam>
<!-- 
    <div class="user-area-body">
      <h2 class="title">
        Provas disponíveis
      </h2>
      <div class="title">Você poderá realizar as provas disponíveis, e ao final verá sua nota</div>

        <div class="row mt-2">
          <div  v-for="prova of provas" :key="prova" class="col-sm-6 mt-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{prova.title}}</h5>
                <p class="card-text">{{prova.description}}</p>
                <button @click="goToExam(prova._id)" class="btn btn-primary btn-student exam-button">REALIZAR PROVA</button>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-sm-4 offset-8">
            <button disabled class="btn btn-gray btn-student w-100 history-button">HISTÓRICO DE PROVAS</button>
          </div>
        </div>
        

    </div> -->
   
  </div>
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import { Component, Prop, Vue } from 'vue-property-decorator';
import ExamsService from '@/services/ExamsService'
import UserArea from '@/components/UserArea.vue';
import ProfesorExam from '@/components/ProfesorExam.vue';

@Component({
  components:{
    UserArea,
    ProfesorExam
  }
})
export default class Profesor extends Vue {
  @Prop() private msg!: string;
  @Prop({default:false}) isProf!:boolean;
  provas = []
  username!:string
  name!:string
  async created(){
    if(!this.$store.state.Auth.user){
      this.$router.push('/login/profesor')
      return
    }
    // this.username = this.$store.state.Auth.user.username
    // this.name = this.$store.state.Auth.user.name
    // this.provas = await ExamsService.getAllExams()
    // this.isProf = this.$store.state.Auth.user.profesor;
  }
  logoutUser(){
    AuthService.logout();
    this.$router.push('/');
  }
  goToExam(exam:any){
    this.$router.push('/exam/'+exam)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">


.btn-student,
.btn-profesor{
  font-size: 14px;
  height: 32px;
  line-height: 14px;
}
.btn-profesor:hover{
  background-color: #04ac18;
}
.user-area-body{
  position: absolute;
  top: 12vh;
  padding: 0 15vw;
  width: 100vw;
  .title{
    color: white;
  }
}
.exam-button{
  display: flex;
  font-size: 14px;
  width: 200px;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-left: auto;
}
.history-button{
  height: 65px;
}
</style>
