<template>
  <div class="profesor-exam">
    <!-- First -->
    <div v-if="stage === 'first'" class="profesor-exam-body">
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
              <h5 class="card-title">{{ prova.title }}</h5>
              <p class="card-text">{{ prova.description }}</p>
              <button class="btn btn-primary btn-profesor exam-button">
                VISUALIZAR PROVA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Second -->
    <div v-if="stage === 'second'" class="profesor-exam-body">
      <h2 class="title">Cadastro de prova</h2>

      <div class="title">Inicie o cadastro informando os dados abaixo</div>

      <div class="card">
        <div class="card-body">

          <div class="form-group">  
            <label for="name">Nome da prova</label>
            <input id="name" type="text" class="form-control">
          </div>
          <div class="form-group">  
            <label for="subject">Disciplina</label>
            <input id="subject" type="text" class="form-control">

            <label for="subject">Quantidade de questões</label>
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
       
       





       <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="reserve"
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
        </div>
      </div>
      



       <!-- <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ prova.title }}</h5>
              <p class="card-text">{{ prova.description }}</p>
              <button class="btn btn-primary btn-profesor exam-button">
                VISUALIZAR PROVA
              </button>
            </div>
          </div> -->





      <div class="btn-group-vertical" role="group">
        <!-- v-for="(alternative, index) of alternatives" -->
        <div
          v-for="(alternative, index) of alternatives"
          :key="index"
          class="mt-2"
        >
          <div class="d-flex">
            <div>
              <input
                type="radio"
                class="btn-check"
                name="btnradio"
                :id="index"
                autocomplete="off"
              />
              <label
                class="btn btn-outline-success icon-check-square"
                :for="index"
              >
                <!-- aqui -->
                <b-icon icon="check"></b-icon>
              </label>
            </div>
            <input type="text" class="form-control" />
          </div>
        </div>
      </div>

      <button class="btn btn-">voltar</button>
    </div>
  </div>

  <!--  -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ExamsService from "@/services/ExamsService";
import { BIcon, BIconArrowUp, BIconArrowDown } from "bootstrap-vue";

@Component({
  components: {
    BIcon,
    BIconArrowUp,
    BIconArrowDown,
  },
})
export default class ProfesorExam extends Vue {
  provas = [];
  stage = "second";
  alternatives = [{}, {}, {}, {}, {}];

  loading = false
  selection = 1

  
  // stage = "first";
  async created() {
    this.provas = await ExamsService.getAllExams();
  }
  newExam() {
    this.stage = "second";
  }
  firstContinue() {
    this.stage = "third";
  }

  reserve () {
    this.loading = true

    setTimeout(() => (this.loading = false), 2000)
  }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .user-area {
//   height: 100vh;
//   &-cont {
//     align-items: baseline;
//     background-color: #8257e5;
//     height: 33vh;
//     &.prof {
//       background-color: #04bf58;
//     }
//   }
// }
// .username-text {
//   color: white;
//   font-size: 14px;
// }

.btn-student,
.btn-profesor {
  font-size: 14px;
  height: 32px;
  line-height: 14px;
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
