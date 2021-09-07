<template>
  <!-- <div class="home"> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->

  <div class="home">

    <div class="container-fluid h-100 d-flex align-items-center">
      <!-- <div class=""></div> -->
      <div class="row w-100">
        <div class="col-5">
          <!-- <font-awesome-icon :icon="['fas', 'user-secret']" /> -->
          <!-- <div>
            <i class="fas fa-chalkboard-teacher"></i>
          </div> -->
        </div>
        <div class="col-7"></div>
        <div class="col-3">

          
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
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    // HelloWorld,
  },
})
export default class Home extends Vue {}
</script>



<style lang="scss">
  @import '@/assets/scss/_mixins';

 .home{
   @include bg(#8257E5);
 }
</style>
