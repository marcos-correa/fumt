<template>
  <div class="student-exam">
    <!-- Home -->
    <div v-if="stage == 'home'" class="student-exam-body">
      <h2 class="title">Provas disponíveis</h2>
      <div class="title">
        Você poderá realizar as provas disponíveis, e ao final verá sua nota
      </div>

      <div class="row mt-2">
        <div v-for="prova of provas" :key="prova" class="col-sm-6 mt-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex">
                <div>
                  <h5 class="card-title mb-0">{{ prova.name }}</h5>
                  <small style="font-size: 12px">
                    DISPONIBILIZADO EM:
                    {{ prova.created_at | moment("DD/MM/YYYY - HH:mm") }}
                  </small>
                </div>
                <div class="ms-auto d-flex justify-items-center">
                  <div class="d-flex flex-column me-2">
                    <small style="font-size: 12px">valor</small>
                    <div class="ms-auto">
                      <h5 class="card-text" style="width: fit-content">
                        {{ prova.value }}
                      </h5>
                    </div>
                  </div>
                  <div class="d-flex flex-column">
                    <small style="font-size: 12px">questões</small>
                    <div class="ms-auto">
                      <h5 class="card-text" style="width: fit-content">
                        {{ prova.totalQuestions }}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              <div class="d-flex align-items-end mt-3">
                <button
                  @click="getExamToAnswer(prova._id)"
                  class="btn btn-primary btn-student exam-button"
                >
                  REALIZAR PROVA
                </button>
              </div>
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

    <div v-if="stage == 'first'" class="student-exam-body">
      <h2 class="title">Realização de Prova</h2>

      <div class="title">
        Leia atentamente ao enunciado e marque uma alternativa de cada questão
        antes de enviar a prova
      </div>
      <div class="card mt-4">
        <div class="card-body">
          <!-- Enunciado/Informações -->
          <div class="d-flex">
            <div>
              <h3>{{ currentExam.name }}</h3>
              <p>{{ currentExam.description }}</p>
            </div>
            <div class="ms-auto d-flex justify-items-center">
              <div class="d-flex flex-column">
                <p style="font-size: 14px; white-space: nowrap">
                  valor por questão
                </p>
                <div class="ms-auto">
                  <h3 class="card-text" style="width: fit-content">
                    {{ currentExam.valuePerQuestion }}
                  </h3>
                </div>
              </div>
              <div class="d-flex flex-column mx-4">
                <p style="font-size: 14px; white-space: nowrap">valor total</p>
                <div class="ms-auto">
                  <h3 class="card-text" style="width: fit-content">
                    {{ currentExam.value }}
                  </h3>
                </div>
              </div>
              <div class="d-flex flex-column me-4">
                <p style="font-size: 14px; white-space: nowrap">questões</p>
                <div class="ms-auto">
                  <h3 class="card-text" style="width: fit-content">
                    {{ currentExam.totalQuestions }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <v-divider></v-divider>
          <div v-for="(question,index) of this.currentExam.questions" :key="index">
            <QuestionFormAnswer
              :ref="'qformansw' + index"
              :question="JSON.stringify(question)"
              :indexQuestion="index"
              v-on:indexanswer="valoresFilho(index, $event)"
            >
            </QuestionFormAnswer>
          </div>
<!-- <pre v-if="this.currentExam">
  
      {{this.currentExam|json}}
</pre> -->


        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ExamsService from "@/services/ExamsService";
import { BIcon, BIconArrowDown, BIconArrowUp } from "bootstrap-vue";
import { Component, Vue } from "vue-property-decorator";
import QuestionFormAnswer from "./QuestionFormAnswer.vue";
@Component({
  components: {
    QuestionFormAnswer,
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
  },
})
export default class StudentExam extends Vue {
  provas = [];
  stage = "home";
  currentExam = {questions:[{alternatives:[{marked:false}]}]};
  originalExam = {};


  async created(): Promise<void> {
    if (!this.$store.state.Auth.user) {
      this.$router.push("/login/student");
      return;
    }
    this.getProvas();
  }

  valoresFilho(index: number, event: number): void {
    this.currentExam.questions[index].alternatives[event].marked = true;
    console.table(this.currentExam);
  }

  async getProvas(): Promise<void> {
    this.provas = await ExamsService.getAllExams();
  }

  async getExamById(id: string) {
    await ExamsService.getExamByID(id).then((res) => {
      this.originalExam = res;
      // this.stage = "first"
    });
  }

  async getExamToAnswer(id: string) {
    await ExamsService.getExamToAnswer(id).then((res) => {
      this.currentExam = res;
      this.stage = "first";
    });
  }
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
.student-exam-body {
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




