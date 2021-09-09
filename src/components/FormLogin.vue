<template>
  <div class="form-login">
    <h2 class="c-white">Olá {{ typeProf ? "professor" : "aluno" }}</h2>

    <div v-if="typeProf" class="mb-4 c-white">
      Para acessar a Área do Professor, entre com seus dados institucionais
    </div>
    <div v-if="!typeProf" class="mb-4 c-white">
      Para acessar a Área do Aluno, entre com seus dados institucionais<br />
      Caso ainda não possua um cadastro,
      <a href="#" class="c-white">Cadastre-se aqui</a>
    </div>

    <form name="form" @submit.prevent="clickLogin">
      <div class="form-group">
        <div class="d-flex align-items-center mb-4">
          <label class="label-text" for="username"> email </label>
          <input
            v-model="user.username"
            v-validate="'required'"
            type="text"
            name="username"
            class="form-control"
          />
        </div>
        <div
          v-if="errors.has('username')"
          class="alert alert-danger"
          role="alert"
        >
          É necessário informar um email
        </div>
      </div>
      <div class="form-group">
        <div class="d-flex align-items-center mb-4">
          <label class="label-text" for="password">senha</label>
          <input
            v-model="user.password"
            v-validate="'required'"
            type="password"
            class="form-control"
            name="password"
          />
        </div>
        <div
          v-if="errors.has('password')"
          class="alert alert-danger"
          role="alert"
        >
          É necessário informar a senha
        </div>
      </div>
      <div class="form-group">
        <button
          class="btn btn-primary btn-student"
          v-bind:class="[
            { 'btn-student': !typeProf },
            { 'btn-profesor': typeProf },
          ]"
          :disabled="loading"
        >
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          ></span>
          <span>ENTRAR</span>
        </button>
      </div>
      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">
          <!-- {{ message }} -->
        </div>
      </div>
    </form>
  </div>
</template>


<script lang="ts">
import UserService from "@/services/UserService";
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class FormLogin extends Vue {
  @Prop({ default: "/" }) private returned!: string;
  private user = { username: "", password: "" };
  private loading = false;
  private message = "";
  private typeProf = false;

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: any) => Promise<any>;

  @Auth.State("user")
  private currentUser!: any;

  created() {
    this.typeProf = this.$route.params.type == "profesor";
    if (this.isLoggedIn && localStorage.getItem("user-fumt")) {
      if (this.$store.state.Auth.user) {
        UserService.setUser(this.$store.state.Auth.user);
        let userId = this.$store.state.Auth.user.id;
        if (this.$store.state.Auth.user.profesor) {
          this.$router.push(`/profesor/${userId}`);
          return;
        } else {
          this.$router.push(`/student/${userId}`);
          return;
        }
      }
    } else {
      return;
    }
  }

  clickLogin() {
    this.loading = true;
    this.$validator.validateAll().then((isValid) => {
      if (!isValid) {
        this.loading = false;
        return;
      }

      if (this.user.username && this.user.password) {
        this.login(this.user).then(
          (data) => {
            data.id;
            if (data.profesor) {
              this.$router.push(`/profesor/${data.id}`);
            } else {
              this.$router.push(`/student/${data.id}`);
            }
          },
          (error) => {
            this.loading = false;
            this.message = error;
          }
        );
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login-cont {
  background-color: white;
}
.label-text {
  color: #ffffff;
  font-weight: 400;
  width: 100px;
}
.btn-student {
  width: 200px;
}
</style>
