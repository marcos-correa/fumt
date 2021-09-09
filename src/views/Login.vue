<template>
  <div class="student" v-bind:class="{ prof: typeProf }">
    <div class="d-flex justify-content-between pt-4 px-4">
      <Return :isBlack="true"></Return>
    </div>
    <div class="d-flex justify-content-center">
      <div class="wrapper-login" v-bind:class="{ prof: typeProf }">
        <FormLogin></FormLogin>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import FormLogin from "@/components/FormLogin.vue";
import Return from "@/components/Return.vue"; // @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {
    Return,
    FormLogin,
  },
})
export default class Login extends Vue {
  typeProf = false;
  

  created() {
    this.typeProf = this.$route.params.type == "profesor";
  }
}
</script>



<style lang="scss">
@import "@/assets/scss/_mixins";
.student {
  @include bg(#e0e0e0);
  &.prof {
    @include bg(#e0e0e0);
  }
}
.wrapper-login {
  @include bg-color(#8257e5);
  border-radius: 20px;
  padding: 40px;
  width: 50%;
  &.prof {
    @include bg-color(#04bf58);
  }
}
</style>
