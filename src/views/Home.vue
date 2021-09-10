<template>
   <div class="home">


    <div class="container-fluid h-100 d-flex align-items-center home-app">
      <div class="row w-100 px-5" style="position: absolute;z-index: 99;">
        <div class="col-5">
          <p class="c-white fumt-text-logo">FUMT</p>
          <p class="c-white" style="font-size:32px">
            Sistema acadêmico de provas
          </p>
        </div>
        <div class="col-7">
          <img src = "@/assets/images/fumt-home.svg" alt="FUMT"/>

        </div>
        <div class="col-3 mt-5">
          <v-overlay :value="overlay"></v-overlay>
          <router-link :to="'/login/student'">
            <button class="btn btn-primary btn-student btn-home">
              <div>
                <i class="fas fa-chalkboard-teacher"></i>
              </div>
              ALUNO
            </button>
          </router-link>
        </div>
        <div class="col-3 mt-5">
          <router-link :to="'/login/profesor'">
            <button class="btn btn-primary btn-profesor btn-home">
              PROFESSOR
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import UserArea from "@/components/UserArea.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    UserArea
  },
})
export default class Home extends Vue {
  overlay = false;
}
</script>



<style scoped lang="scss">
@import "@/assets/scss/_mixins";

.home {
  @include bg(#8257e5);
}
.home-app{
  position: absolute;
  top: 0;
}
</style>
