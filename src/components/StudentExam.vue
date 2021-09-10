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
      <h5 class="mt-5">Provas realizadas</h5>
      <div class="row mt-2">
        <div
          v-for="(answer, index) in answers"
          :key="index"
          class="col-sm-6 mt-3"
        >
          <div class="card">
            <div class="card-body">
              <div class="d-flex">
                <div>
                  <h5 class="card-title mb-0">{{ answer.exam.name }}</h5>
                  <small style="font-size: 12px">
                    RESPONDIDO EM
                    {{ answer.answered_at | moment("DD/MM/YYYY - HH:mm") }}
                  </small>
                </div>
                <div class="ms-auto d-flex justify-items-center">
                  <div class="d-flex flex-column me-2">
                    <small style="font-size: 12px">nota obtida</small>
                    <div class="ms-auto">
                      <h5 class="card-text" style="width: fit-content">
                        {{ answer.note }}/{{ answer.exam.value }}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
              <button
                @click="showAnswer(answer._id)"
                class="btn btn-primary btn-student exam-button mt-3"
              >
                DETALHES
              </button>
            </div>
          </div>
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
          <div
            v-for="(question, index) of this.currentExam.questions"
            :key="index"
          >
            <QuestionFormAnswer
              :ref="'qformansw' + index"
              :question="JSON.stringify(question)"
              :indexQuestion="index"
              v-on:indexanswer="valoresFilho(index, $event)"
            >
            </QuestionFormAnswer>
          </div>

          <div class="d-flex justify-content-between my-4">
            <div>
              <button
                @click="() => (this.stage = 'home')"
                class="btn btn-primary btn-profesor btn-large"
              >
                VOLTAR
              </button>
            </div>
            <div>
              <div v-if="!validForm" class="text-danger">
                Ainda existem campos obrigatórios que não foram preenchidos
              </div>
            </div>
            <button
              class="btn btn-primary btn-student btn-large"
              @click="finalizarProva()"
            >
              FINALIZAR PROVA
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="stage == 'second'" class="student-exam-body">
      <h2 class="title">Sua nota foi {{ this.newAnswerExamObject.note }}</h2>

      <div class="title">Confira o resultado da sua prova</div>
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
          <v-divider></v-divider>
          <div
            v-for="(question, index) of newAnswerExamObject.exam.questions
              .length"
            :key="index"
          >
            <answer-view
              :answID="newAnswerExamObject._id"
              :indexQuestion="index"
            ></answer-view>
          </div>

          <div class="d-flex justify-content-between my-4">
            <div>
              <button
                @click="() => this.$router.push('/')"
                class="btn btn-primary btn-student btn-large"
              >
                VOLTAR
              </button>
            </div>
            PROVA FINALIZADA
          </div>
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
import { AnswerExam } from "../interfaces/answerexam.interface";
import { Exam } from "@/interfaces/exam.interface";
import UserService from "@/services/UserService";
import AnswerView from "./AnswerView.vue";

@Component({
  components: {
    QuestionFormAnswer,
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
    AnswerView,
  },
})
export default class StudentExam extends Vue {
  provas!: any[];
  answers = [];
  stage = "home";
  currentExam!: Exam;
  originalExam = {};
  validForm = true;
  newAnswerExamObject!: AnswerExam;
  answerId = "123";

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
    let _answ = [""];
    let answredIDs = await ExamsService.getUnansweredExamsByStudentId(
      UserService.getUserID()
    );
    answredIDs.forEach((ans: any) => {
      _answ.push(ans._id);
    });
    let _provas = await ExamsService.getAllExams();
    let new_provas: any[] = []
    _provas.forEach((prov: any) => {
      if (!_answ.includes(prov._id)) {
        new_provas.push(prov);
      }
    });
    this.provas = new_provas
    this.answers = await ExamsService.getAnswredExamsByStudentId(
      UserService.getUserID()
    );
  }

  async getAnswerExamByID(id: string) {
    await ExamsService.getAnswerExamByID(id).then((res) => {
      this.newAnswerExamObject = res;
      this.stage = "second";
    });
  }

  async getExamToAnswer(id: string) {
    await ExamsService.getExamToAnswer(id).then((res) => {
      this.currentExam = res;
      this.stage = "first";
    });
  }

  async finalizarProva() {
    if (this.vaLidarForm()) {
      let answer = await this.montarProva();
      console.log(answer);
      await ExamsService.createAnswerExam(this.newAnswerExamObject).then(
        (res: any) => {
          if (res) {
            this.answerId = res._id;
            this.newAnswerExamObject = res;
            this.stage = "second";
            this.getProvas();
          }
        }
      );
    }
  }
  vaLidarForm() {
    let valid = true;
    for (let i = 0; i < this.currentExam.questions.length; i++) {
      let element = eval(`this.$refs.qformansw${i}`);
      let _valid = element[0].isValidAnswer();
      if (!_valid) {
        valid = _valid;
      }
    }
    this.validForm = valid;
    return valid;
  }
  async montarProva(): Promise<AnswerExam> {
    let gab = await ExamsService.getExamByID(this.currentExam._id);
    this.currentExam.questions.forEach((ques, i) => {
      ques.alternatives.forEach((alt, j) => {
        alt["correct"] = gab.questions[i].alternatives[j].correct;
      });
    });
    let note = this.getNoteOfExam(this.currentExam);
    console.log(note);
    let user = UserService.getUser();
    this.newAnswerExamObject = {
      examID: this.currentExam._id,
      studentID: UserService.getUserID(),
      studentName: UserService.getNameUser(),
      answered_at: new Date(),
      exam: this.currentExam,
      note: note,
    };
    return this.newAnswerExamObject;
  }

  async showAnswer(id: string) {
    await ExamsService.getAnswerExamByID(id).then((res) => {
      this.currentExam = res.exam;
      this.newAnswerExamObject = res;
      this.stage = "second";
    });
  }

  getNoteOfExam(exam: Exam) {
    let totalper = exam.valuePerQuestion;
    let nota = 0;

    exam.questions.forEach((q, i) => {
      q.alternatives.forEach((a, j) => {
        if (a.marked == true && a.correct == true) {
          nota += totalper;
        }
      });
    });
    return nota;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_mixins.scss";

.btn-student,
.btn-profesor {
  font-size: 14px;
  height: 32px;
  line-height: 14px;
  &.btn-large {
    @include largebutton();
  }
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




