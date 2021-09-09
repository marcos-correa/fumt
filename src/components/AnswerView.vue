<template>
  <div class="answer-view">
    <div class="form-group my-5">
      <div class="d-flex justify-content-between me-4">
        <h5>Questão {{ indexQuestion + 1 }}</h5>
        <p class="text-success" v-if="correctAnswer(answer.exam.questions[indexQuestion].alternatives)">
          ACERTOU
        </p>
        <p class="text-danger" v-if="!correctAnswer(answer.exam.questions[indexQuestion].alternatives)">
          ERROU
        </p>
      </div>

      <p>{{ answer.exam.questions[indexQuestion].enunciate }}</p>
      <div class="btn-group-vertical" role="group">
        <div class="form-group mt-3">
          <div
            v-for="(alternative, indexAlternative) of answer.exam.questions[
              indexQuestion
            ].alternatives"
            :key="indexAlternative"
            class="mt-2 group-items"
          >
            <div class="group-itens-cont">
              <input
                :name="'enunciado' + indexQuestion"
                type="radio"
                class="btn-check rounded-0 gi-input"
                :id="indexQuestion + 'ans' + indexAlternative"
                autocomplete="off"
                disabled
              />
              <label
                class="btn icon-check-square rounded-0 gi-label"
                v-bind:class="{
                  'btn-outline-success':
                    alternative.marked == false && alternative.correct == false,
                  'btn-success':
                    alternative.correct == true,
                  'btn-danger':
                    alternative.marked == true && alternative.correct == false,
                }"
                :for="indexQuestion + 'ans' + indexAlternative"
              >
                <b-icon icon="check" class="me-2"></b-icon>
                {{ alternative.description }}
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
import { Component, Prop, Vue } from "vue-property-decorator";
import { BIcon, BIconArrowUp, BIconArrowDown } from "bootstrap-vue";
import ExamsService from "@/services/ExamsService";
import { Question } from "@/interfaces/question.interface";
import { AnswerExam } from "@/interfaces/answerexam.interface";

@Component({
  components: {
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
  },
})
export default class AnswerView extends Vue {
  @Prop({ default: 0 }) private indexQuestion!: number;
  @Prop({ default: "" }) private answID!: string;
  answer = "";
  question = "";
  async created() {
    this.answer = await ExamsService.getAnswerExamByID(this.answID);
  }

  correctAnswer(alts: any) {
    let response = false;
    alts.forEach((alt: { marked: boolean; correct: boolean }) => {
      if (alt.marked == true && alt.correct == true) {
        response = true;
      }
    });
    return response;
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
.group-items {
  width: 33vw;
  .group-itens-cont {
    .gi-label {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
