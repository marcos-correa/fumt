<template>
  <div class="question-form">
    <div class="form-group my-4">
      <h4>Questão {{ indexQuestion + 1 }}</h4>
      <label for="enunciate">Enunciado da questão</label>
      <div class="text-danger" v-if="errors['enunciate']">
        É necessário preencher o enunciado
      </div>

      <textarea
        name="enunciate"
        id="index"
        cols="30"
        rows="5"
        class="form-control"
        @change="setEnunciate($event.target.value)"
      ></textarea>
      <!-- alternativas -->
      <div class="btn-group-vertical" role="group">
        <div class="form-group mt-3">
          <label>Preencha as alternativas e selecione qual é a correta</label>
          <div class="text-danger" v-if="errors['alternatives']">
            É necessário preencher todas as alternativas
          </div>
          <div class="text-danger" v-if="errors['correct']">
            É necessário marcar uma alternativa correta
          </div>
          <div
            v-for="(alternative, indexAlternative) of alternatives"
            :key="indexAlternative"
            class="mt-2"
          >
            <div class="d-flex">
              <div>
                <input
                  :name="'enunciado'+indexQuestion"
                  type="radio"
                  class="btn-check rounded-0"
                  :id="indexQuestion + 'en' + indexAlternative"
                  autocomplete="off"
                  @change="onChange($event, indexAlternative)"
                />
                <label
                  class="btn btn-outline-success icon-check-square rounded-0"
                  :for="indexQuestion + 'en' + indexAlternative"
                >
                  <b-icon icon="check"></b-icon>
                </label>
              </div>
              <input
                @change="setDescription($event.target.value, indexAlternative)"
                type="text"
                class="form-control form-alternative-inputtext rounded-0"
                v-bind:class="{ 'btn-success': isChecked(indexAlternative) }"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>



<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { BIcon, BIconArrowUp, BIconArrowDown } from "bootstrap-vue";

@Component({
  components: {
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
  },
})
export default class QuestionForm extends Vue {
  @Prop({ default: 0 }) private indexQuestion!: number;
  @Emit("newquestion") public newquestion() {
    let question = JSON.stringify(this.question);
    return question;
  }
  alternatives = [{ description: "", correct: false, marked: false }];
  question = { enunciate: "", alternatives: this.alternatives };
  errors = { correct: false, alternatives: false, enunciate: false };
  isValidQuestion = false

  async created(): Promise<any> {
    for (let i = this.alternatives.length; i < 5; i++) {
      this.alternatives.push({
        description: "",
        correct: false,
        marked: false,
      });
    }
  }
  public validarQuest(){
    if(this.validQuestion()){
      this.emitirQuestao()
    }
  }
  emitirQuestao(): void {
    this.validQuestion();
    if(this.isValidQuestion){
      this.newquestion();
    }else{
      return
    }
  }
  setEnunciate(value: string): void {
    this.question.enunciate = value;
    this.validQuestion();
  }

  onChange(event: any, indexAlternatives: number): void {
    this.alternatives.forEach((alt) => {
      alt.correct = false;
    });
    this.alternatives[indexAlternatives].correct = event.target.checked;
    this.validQuestion();
  }
  isChecked(index: number): boolean {
    if (this.alternatives[index].correct) {
      return true;
    }

    return false;
  }
  setDescription(event: any, index: number): void {
    this.alternatives[index].description = event;
    this.validQuestion();
  }



  resetErrors() {
    this.errors["correct"] = false;
    this.errors["alternatives"] = false;
    this.errors["enunciate"] = false;
  }
  validEnunciate() {
    if (!this.question.enunciate) {
      this.errors["enunciate"] = true;
      return false;
    }
    return true;
  }
  validAlternatives() {
    this.alternatives.forEach((alt) => {
      if (!alt.description) {
        this.errors["alternatives"] = true;
        return false
      }
    });
    return true
  }
  validCorrect() {
    let missedCorrect = true;
    this.alternatives.forEach((alt) => {
      if (alt.correct) {
        missedCorrect = false;
      }
    });
    if (missedCorrect) {
      this.errors["correct"] = true;
      return false
    }
    return true
  }
  validQuestion() {
    this.resetErrors();
    if (!this.validEnunciate() || !this.validCorrect() || !this.validAlternatives() ) {
      return false;
    }
    this.isValidQuestion = true
    return true
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.profesor-exam-body {
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
