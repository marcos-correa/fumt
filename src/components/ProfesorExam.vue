<template>
  <div class="profesor-exam">
    <!-- Home -->
    <div v-if="stage === 'home'" class="profesor-exam-body">
      <h2 class="title">Provas cadastradas</h2>

      <div class="c-white">
        Você poderá cadastrar as provas e visualizar as provas já cadastradas
      </div>
      <div class="row mt-2 mb-5">
        <div class="col-sm-6 mt-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Nova prova</h5>
              <p class="card-text">Cadastre uma nova prova</p>
              <button
                @click="newExam()"
                class="btn btn-primary btn-profesor exam-button"
              >
                NOVA PROVA
              </button>
            </div>
          </div>
        </div>
      </div>
      <h5>Histórico de provas</h5>
      <div class="row mt-2">
        <div
          v-for="(prova, index) in provas"
          :key="index"
          class="col-sm-6 mt-3"
        >
          <div class="card">
            <div class="card-body">
              <div class="d-flex">
                <div>
                  <h5 class="card-title">{{ prova.name }}</h5>
                  <p class="card-text">{{ prova.description }}</p>
                </div>
                <button
                  @click="deleteExamById(prova._id)"
                  class="btn c-white ms-auto p-0
                  "
                  style="font-size: 24px; height:max-content"
                >
                  <b-icon
                    icon="trash"
                    class="rounded-circle bg-danger p-1"
                  ></b-icon>
                </button>
              </div>

              <button
                @click="showExamById(prova._id)"
                class="btn btn-primary btn-profesor exam-button"
              >
                VISUALIZAR PROVA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- First -->
    <div v-if="stage === 'first'" class="profesor-exam-body">
      <h2 class="title">Cadastro de prova</h2>

      <div class="title">Inicie o cadastro informando os dados abaixo</div>

      <div class="card mt-4">
        <div class="card-body">
          <div class="row">
            <!-- Nome -->
            <div class="col-sm-4">
              <div class="form-group">
                <label for="name">Nome da prova / Disciplina</label>
                <input
                  v-model="examName"
                  id="name"
                  type="text"
                  class="form-control"
                  placeholder="Ex: Prova de Algorítmos"
                  required
                />
              </div>
            </div>

            <!-- Valor -->
            <div class="col-sm-4">
              <div class="form-group">
                <label for="examvalue">Valor total da prova</label>
                <input
                  v-model="examValue"
                  id="examvalue"
                  type="number"
                  class="form-control"
                  placeholder="Ex: 10"
                />
              </div>
            </div>

            <div class="col-sm-4">
              <div class="d-flex flex-column">
                <span class="ms-auto">Valor por questão</span>
                <h4 class="ms-auto">
                  {{ (examValue / totalQuestions).toFixed(2) }}
                </h4>
              </div>
            </div>

            <!-- Número de Questões -->
            <div class="col-sm-12">
              <div class="form-group">
                <label for="subject">Quantidade de questões</label>

                <input
                  v-model="totalQuestions"
                  min="1"
                  class="w-100"
                  max="10"
                  step="1"
                  type="range"
                  value="0"
                  ref="quest"
                  @change="setTotalQuestions($event.target.value)"
                />
                <div
                  class="d-flex justify-content-between"
                  style="padding: 0 0 0 0px"
                >
                  <div v-for="(item, index) of quantityArray" :key="index">
                    <div style="width: 16px; text-align: center">
                      {{ index + 1 }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Descrição	 -->
            <div class="col-sm-12">
              <div class="form-group">
                <label for="description">Descrição da prova</label>
                <textarea
                  v-model="examDescription"
                  name="description"
                  id="description"
                  cols="30"
                  class="form-control"
                  rows="10"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between mt-4 mb-5">
        <div>
          <button @click="()=>this.stage='home'" class="btn btn-primary btn-profesor btn-large">VOLTAR</button>
        </div>
        <div v-if="errorsProfExam.length > 0">
          <span v-for="(error, index) of errorsProfExam" :key="index">
            <div class="text-danger">{{ error }}</div>
          </span>
        </div>
        <div>
          <button
            @click="continueButton('second')"
            class="btn btn-primary btn-profesor btn-large"
          >
            CONTINUAR
          </button>
        </div>
      </div>
    </div>

    <!-- Second -->
    <div v-if="stage === 'second' && !showModal" class="profesor-exam-body">
      <h2 class="title">Questões</h2>

      <div v-if="totalQuestions > 1" class="title">
        Preencha as {{ totalQuestions }} questões da prova
      </div>
      <div v-if="totalQuestions == 1" class="title">
        Preencha a questão única da prova
      </div>
      <div class="card mt-4">
        <div class="card-body">
          <v-divider></v-divider>
          <div v-for="(question, index) of this.questions" :key="index">
            <QuestionForm
              :ref="'qform' + index"
              :indexQuestion="index"
              v-on:newquestion="valoresFilho(index, $event)"
            ></QuestionForm>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between my-4">
        <div>
          <button @click="()=>this.stage='first'" class="btn btn-primary btn-profesor btn-large">VOLTAR</button>
        </div>
        <div>
          <div v-if="!validForm" class="text-danger">
            Ainda existem campos obrigatórios que não foram preenchidos
          </div>
        </div>
        <button
          class="btn btn-primary btn-profesor btn-large"
          @click="criarProva()"
        >
          CRIAR PROVA
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showModal" class="profesor-exam-body modal-pe">
      <div v-if="showModal" class="modalPE">
        <div class="mod-card-content">
          <div class="card">
            <div class="d-flex pt-2 ps-3 pe-1">
              <div>
                <h3>{{ viewExam.name }}</h3>
                <div v-if="viewExam.created_at">
                  <div>
                  criado em: 
                  </div>
                  {{viewExam.created_at}}
                </div>
              </div>
              <button
                @click="toogleModal()"
                class="btn c-white ms-auto"
                style="font-size: 30px"
              >
                <b-icon
                  icon="x"
                  class="rounded-circle bg-secondary p-0"
                ></b-icon>
              </button>
            </div>
            <v-divider></v-divider>
            <div class="card-body" style="overflow-y: scroll; height: 69vh">
                <h5>{{ viewExam.description }}</h5>
            
              <v-divider></v-divider>
              <p>Questões</p>
              <div
                v-for="(question, indexq) of viewExam.questions"
                :key="indexq"
                class=""
              >
                {{ indexq + 1 }}. {{ question.enunciate }}<br />
                <ul>
                  <li
                    v-for="(alt, indexa) of question.alternatives"
                    :key="indexa"
                  >
                    <p v-if="alt.correct" class="text-success"><strong>{{ alt.description }}</strong></p>
                    <p v-if="!alt.correct" >{{ alt.description }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ExamsService from "@/services/ExamsService";
import { BIcon, BIconArrowUp, BIconArrowDown } from "bootstrap-vue";
import QuestionForm from "./QuestionForm.vue";

@Component({
  components: {
    QuestionForm,
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
  },
})
export default class ProfesorExam extends Vue {
  provas = [];
  alternatives = [{ description: "", correct: false, marked: false }];
  errorsProfExam = [""];

  viewExam = {};
  showModal = false;

  stage = "home";
  // First
  examName = "";
  examDescription = "";
  totalQuestions = 1;
  questions = [{ enunciate: "", alternatives: this.alternatives }];
  examValue = 10;

  // Second
  quantityArray = [{}];
  newExamObject = {};
  validForm = true;

  choosedQuestion = 0;
  async criarProva() {
    if (this.vaLidarForm()) {
      this.montarProva();
      await ExamsService.createExam(this.newExamObject).then((res: any) => {
        if (res) {
          this.stage = "home";
          this.getProvas();
        }
      });
    }
  }
  async deleteExamById(id: string) {
    if (id) {
      await ExamsService.deleteExamByID(id);
    }
    this.getProvas();
  }

  async showExamById(id: string) {
    if (id) {
      await ExamsService.getExamByID(id).then((res) => {
        this.viewExam = res;
        this.showModal = true;
      });
    }
  }
  toogleModal() {
    this.showModal = !this.showModal;
  }

  vaLidarForm() {
    let valid = true;
    for (let i = 0; i < this.questions.length; i++) {
      let element = eval(`this.$refs.qform${i}`);
      element[0].validarQuest();
      if (!element[0].isValidQuestion) {
        valid = false;
      }
    }
    this.validForm = valid;
    return valid;
  }
  setTotalQuestions(event: any) {
    let array = [];
    for (let i = 0; i < event; i++) {
      array.push({ enunciate: "", alternatives: this.alternatives });
    }
    this.questions = array;
  }
  created(): void {
    for (let i = this.quantityArray.length; i < 10; i++) {
      this.quantityArray.push({});
    }
    for (let i = this.alternatives.length; i < 5; i++) {
      this.alternatives.push({
        description: "",
        correct: false,
        marked: false,
      });
    }
    this.getProvas();
  }
  async getProvas() {
    this.provas = await ExamsService.getAllExams();
  }
  valoresFilho(index: number, event: string): void {
    let question = JSON.parse(event);
    this.questions[index] = question;
    console.table(question);
  }
  newExam(): void {
    this.stage = "first";
  }

  resetFirst(): void {
    this.examName = "";
    this.examDescription = "";
    this.totalQuestions = 1;
    this.examValue = 10;
  }

  firstContinue(): void {
    this.stage = "second";
  }

  continueButton(nextstage: string): void {
    if (nextstage == "second") {
      if (this.validProvaFirstStage()) {
        this.stage = nextstage;
        this.montarProva();
      }
    }
    if (nextstage == "third") {
      this.criarProva();
    }
  }
  validProvaFirstStage(): boolean {
    this.errorsProfExam = [];
    if (
      this.examName &&
      this.examDescription &&
      this.examValue &&
      this.totalQuestions
    ) {
      return true;
    }
    if (!this.examName) {
      this.errorsProfExam.push("A prova precisa ter um nome");
    }
    if (!this.examDescription) {
      this.errorsProfExam.push("A prova precisa ter uma descrição");
    }
    if (!this.examValue) {
      this.errorsProfExam.push("A prova precisa ter um valor total");
    }

    return false;
  }

  montarProva(): void {
    this.newExamObject = {
      name: this.examName,
      description: this.examDescription,
      value: this.examValue,
      totalQuestions: this.totalQuestions,
      valuePerQuestion: (this.examValue / this.totalQuestions).toFixed(2),
      questions: this.questions,
    };
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_mixins.scss";

.modalPE {
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: #00000090;
  display: flex;
  align-items: center;
  justify-content: center;
  .mod-card-content {
    height: 90vh;
    width: 50vw;
  }
}

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
.profesor-exam-body {
  position: absolute;
  top: 12vh;
  padding: 0 15vw;
  width: 100vw;
  .title {
    color: white;
  }
  &.modal-pe {
    top: 0;
    padding: 0;
    width: 100vw;
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
