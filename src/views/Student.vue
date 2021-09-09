<template>
  <div class="user-area">

    <UserArea></UserArea>
    
    <StudentExam></StudentExam>
   
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ExamsService from '@/services/ExamsService'
import UserArea from '@/components/UserArea.vue';
import StudentExam from '@/components/StudentExam.vue';

@Component({
  components:{
    UserArea,
    StudentExam
  }
})
export default class Student extends Vue {
  provas = []
  
  async created(){
    if(!this.$store.state.Auth.user){
      this.$router.push('/login/student')
      return
    }
    this.provas = await ExamsService.getAllExams()
   
  }
  
}
</script>

<style scoped lang="scss">

</style>
