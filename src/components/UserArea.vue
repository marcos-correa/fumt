<template>
  <div class="user-area">
    <div class="d-flex justify-content-between pt-4 px-4 user-area-cont" v-bind:class="{prof:isProf}">

      <!-- <Return></Return> -->
      <div class="username-text">Área do {{isProf?'professor':'aluno'}}: {{name}}</div>
      <div class="d-flex align-items-center">
        <div class="username-text pe-3">
          {{ username}}
        </div>

        <div style="width:100px">
          <button v-on:click="logoutUser()" class="btn btn-primary w-100" v-bind:class="[{'btn-student':!isProf},{'btn-profesor':isProf}]">SAIR</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AuthService from '@/services/AuthService';
import { Component, Prop, Vue } from 'vue-property-decorator';
import Return from './Return.vue';
import ExamsService from '@/services/ExamsService'
import UserService from '@/services/UserService';
// Return

@Component({
  components:{
    Return
  }
})
export default class UserArea extends Vue {
  @Prop() private msg!: string;
  isProf = false;
  provas = []
  username!:string
  name!:string
  async created(){
    UserService.setUser(this.$store.state.Auth.user)

    this.username = this.$store.state.Auth.user.username
    this.name = this.$store.state.Auth.user.name
    this.provas = await ExamsService.getAllExams()
    this.isProf = this.$store.state.Auth.user.profesor;
  }
  logoutUser(){
    AuthService.logout();
    this.$router.push('/');
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.user-area{
  height: 100vh;
  &-cont{
    align-items: baseline;
    background-color: #8257E5;
    height: 33vh;
    &.prof{
      background-color: #04BF58;
    }
  }
}
.username-text{
  color: white;
  font-size: 14px;
}
.btn-student,
.btn-profesor{
  font-size: 14px;
  height: 32px;
  line-height: 14px;
}
.btn-profesor:hover{
  background-color: #04ac18;
}
</style>
