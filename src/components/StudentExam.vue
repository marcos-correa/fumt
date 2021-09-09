<template>
  <div class="student-exam">
    <div class="user-area-body">
      <h2 class="title">Provas disponíveis</h2>
      <div class="title">
        Você poderá realizar as provas disponíveis, e ao final verá sua nota
      </div>

      <div class="row mt-2">
        <div v-for="prova of provas" :key="prova" class="col-sm-6 mt-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ prova.name }}</h5>
              <p class="card-text">{{ prova.description }}</p>
              <p class="card-text">{{ prova.value }}</p>
              <p class="card-text">{{ prova.totalQuestions }}</p>
              <p class="card-text">{{ prova.valuePerQuestion }}</p>
              <p class="card-text">{{ getFormatDate(prova.created_at) }}</p>
              <button
                @click="goToExam(prova._id)"
                class="btn btn-primary btn-student exam-button"
              >
                REALIZAR PROVA
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-sm-4 offset-8">
          <button
            disabled
            class="btn btn-gray btn-student w-100 history-button"
          >
            HISTÓRICO DE PROVAS
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ExamsService from "@/services/ExamsService";
import { BIcon, BIconArrowUp, BIconArrowDown } from "bootstrap-vue";
import QuestionForm from "./QuestionForm.vue";
import AuthService from "@/services/AuthService";

@Component({
  components: {
    QuestionForm,
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
  },
})
export default class StudentExam extends Vue {
  provas = [];
  // alternatives = [{ description: "", correct: false, marked: false }];
  // errorsProfExam = [""];

  // viewExam = {};
  // showModal = false;

  // stage = "home";
  // // First
  // examName = "";
  // examDescription = "";
  // totalQuestions = 1;
  // questions = [{ enunciate: "", alternatives: this.alternatives }];
  // examValue = 10;

  // // Second
  // quantityArray = [{}];
  // newExamObject = {};
  // validForm = true;

  // choosedQuestion = 0;
  // async criarProva() {
  //   if (this.vaLidarForm()) {
  //     this.montarProva();
  //     await ExamsService.createExam(this.newExamObject).then((res: any) => {
  //       if (res) {
  //         this.stage = "home";
  //         this.getProvas();
  //       }
  //     });
  //   }
  // }
  // async deleteExamById(id: string) {
  //   if (id) {
  //     await ExamsService.deleteExamByID(id);
  //   }
  //   this.getProvas();
  // }

  // async showExamById(id: string) {
  //   if (id) {
  //     await ExamsService.getExamByID(id).then((res) => {
  //       this.viewExam = res;
  //       this.showModal = true;
  //     });
  //   }
  // }
  // toogleModal() {
  //   this.showModal = !this.showModal;
  // }

  // vaLidarForm() {
  //   let valid = true;
  //   for (let i = 0; i < this.questions.length; i++) {
  //     let element = eval(`this.$refs.qform${i}`);
  //     element[0].validarQuest();
  //     if (!element[0].isValidQuestion) {
  //       valid = false;
  //     }
  //   }
  //   this.validForm = valid;
  //   return valid;
  // }
  // setTotalQuestions(event: any) {
  //   let array = [];
  //   for (let i = 0; i < event; i++) {
  //     array.push({ enunciate: "", alternatives: this.alternatives });
  //   }
  //   this.questions = array;
  // }
  async created(): Promise<void> {
   if (!this.$store.state.Auth.user) {
      this.$router.push("/login/student");
      return;
    }
    this.username = this.$store.state.Auth.user.username;
    this.name = this.$store.state.Auth.user.name;
    this.provas = await ExamsService.getAllExams();
    this.isProf = this.$store.state.Auth.user.profesor;
    this.getProvas();
  }
  async getProvas() {
    this.provas = await ExamsService.getAllExams();
  }
  getFormatDate(date:Date){
    console.log('')
  }

  @Prop() private msg!: string;
  @Prop({ default: false }) isProf!: boolean;
  username!: string;
  name!: string;
 
  logoutUser() {
    AuthService.logout();
    this.$router.push("/");
  }
  goToExam(exam: any) {
    this.$router.push("/exam/" + exam);
  }

  // valoresFilho(index: number, event: string): void {
  //   let question = JSON.parse(event);
  //   this.questions[index] = question;
  //   console.table(question);
  // }
  // newExam(): void {
  //   this.stage = "first";
  // }

  // resetFirst(): void {
  //   this.examName = "";
  //   this.examDescription = "";
  //   this.totalQuestions = 1;
  //   this.examValue = 10;
  // }

  // firstContinue(): void {
  //   this.stage = "second";
  // }

  // continueButton(nextstage: string): void {
  //   if (nextstage == "second") {
  //     if (this.validProvaFirstStage()) {
  //       this.stage = nextstage;
  //       this.montarProva();
  //     }
  //   }
  //   if (nextstage == "third") {
  //     this.criarProva();
  //   }
  // }
  // validProvaFirstStage(): boolean {
  //   this.errorsProfExam = [];
  //   if (
  //     this.examName &&
  //     this.examDescription &&
  //     this.examValue &&
  //     this.totalQuestions
  //   ) {
  //     return true;
  //   }
  //   if (!this.examName) {
  //     this.errorsProfExam.push("A prova precisa ter um nome");
  //   }
  //   if (!this.examDescription) {
  //     this.errorsProfExam.push("A prova precisa ter uma descrição");
  //   }
  //   if (!this.examValue) {
  //     this.errorsProfExam.push("A prova precisa ter um valor total");
  //   }

  //   return false;
  // }

  // montarProva(): void {
  //   this.newExamObject = {
  //     name: this.examName,
  //     description: this.examDescription,
  //     value: this.examValue,
  //     totalQuestions: this.totalQuestions,
  //     valuePerQuestion: (this.examValue / this.totalQuestions).toFixed(2),
  //     questions: this.questions,
  //   };
  // }
}
</script>

<style scoped lang="scss">
.btn-student,
.btn-profesor {
  font-size: 14px;
  height: 32px;
  line-height: 14px;
}
.btn-profesor:hover {
  background-color: #04ac18;
}
.user-area-body {
  position: absolute;
  top: 12vh;
  padding: 0 15vw;
  width: 100vw;
  .title {
    color: white;
  }
}
.exam-button {
  display: flex;
  font-size: 14px;
  width: 200px;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-left: auto;
}
.history-button {
  height: 65px;
}
</style>




