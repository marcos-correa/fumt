<template>
   <div class="home">


    <div class="container-fluid h-100 d-flex align-items-center home-app">
      <!-- <div style="position:absolute" class="w-100 pr-3">

        <UserArea></UserArea>
      </div> -->
      <div class="row w-100" style="  position: absolute;z-index: 99;">
        <div class="col-5">
          <v-btn color="error" @click="overlay = !overlay">
            Show Overlay
          </v-btn>
        </div>
        <div class="col-7"></div>
        <div class="col-3">
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
        <div class="col-3">
          <router-link :to="'/login/profesor'">
            <button class="btn btn-primary btn-profesor btn-home">
              PROFESSOR
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  <!-- </div> -->
</template>

<script lang="ts">
import UserArea from "@/components/UserArea.vue";
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
@Component({
  components: {
    UserArea
    // HelloWorld,
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
