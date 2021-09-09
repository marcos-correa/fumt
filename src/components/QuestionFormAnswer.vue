<template>
  <div class="question-form">
    <div class="form-group my-5">
      <h5>Questão {{ indexQuestion + 1 }}</h5>
      <p>{{question.enunciate}}</p>
      <div class="btn-group-vertical" role="group">
        <div class="form-group mt-3">
          <div class="text-danger" v-if="errorsQuestionForm['marked']">
            É necessário marcar uma alternativa correta
          </div>
          <div
            v-for="(alternative, indexAlternative) of this.question.alternatives"
            :key="indexAlternative"
            class="mt-2 group-items"
          >
            <div class="group-itens-cont">
              <input
                :name="'enunciado'+indexQuestion"
                type="radio"
                class="btn-check rounded-0 gi-input"
                :id="indexQuestion + 'ans' + indexAlternative"
                autocomplete="off"
                @change="onChange($event, indexAlternative)"
              />
              <label
                class="btn btn-outline-success icon-check-square rounded-0 gi-label"
                :for="indexQuestion + 'ans' + indexAlternative"
              >
                <b-icon icon="check" class="me-2"></b-icon>
                {{alternative.description}}
              </label>
            </div>
          </div>
        </div>
      </div>

    </div>
    <v-divider></v-divider>

  </div>
</template>



<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { BIcon, BIconArrowUp, BIconArrowDown } from "bootstrap-vue";
import ExamsService from "@/services/ExamsService";
import { Exam } from "@/interfaces/exam.interface";
import { Question } from "@/interfaces/question.interface";

@Component({
  components: {
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
  },
})
export default class QuestionFormAnswer extends Vue {
  @Prop({ default: 0 }) private indexQuestion!: number;
  // @Prop({ default: {} }) private question = {enunciate: '',alternatives:[{marked:false}]};
  @Emit("indexanswer") public indexanswer() {
    return this.indexAnswer;
  }
  errorsQuestionForm = { marked: false };
  indexAnswer = -1
  exam!:Exam
  question!: Question
  async created(): Promise<any> {
    this.exam = ExamsService.getCurrentExam()
    this.question = this.exam.questions[this.indexQuestion]
  }
  validarQuest(): void{
    if(this.isValidAnswer()){
      this.emitirQuestao()
    }
  }
  emitirQuestao(): void {
    if(this.isValidAnswer()){
      this.indexanswer();
    }else{
      return
    }
  }

  onChange(event: any, indexAlternatives: number): void {
    this.question.alternatives.forEach((alt) => {
      alt.marked = false;
    });
    this.indexQuestion = indexAlternatives
    this.question.alternatives[indexAlternatives].marked = event.target.checked;
    if(this.isValidAnswer()){
      this.emitirQuestao()
    }
  }
  isChecked(index: number): boolean {
    if (this.question.alternatives[index].marked) {
      return true;
    }
    return false;
  }
 
  reseterrorsQuestionForm() {
    this.errorsQuestionForm["marked"] = false;
  }
  
  validMarked() {
    let missedMarked = true;
    this.question.alternatives.forEach((alt) => {
      if (alt.marked) {
        missedMarked = false;
      }
    });
    if (missedMarked) {
      this.errorsQuestionForm["marked"] = true;
      return false
    }
    return true
  }
  isValidAnswer() {
    this.reseterrorsQuestionForm();
    if (!this.validMarked()) {
      return false;
    }
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
.group-items{
  width: 33vw;
  .group-itens-cont{
    .gi-label{
      display: flex;
      align-items: center;
      width: 100%;
    } 
  }
}
</style>
