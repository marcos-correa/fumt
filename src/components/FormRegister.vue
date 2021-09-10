<template>
  <div class="form-login">
    <div>
      <h2 class="c-white">Olá {{ typeProf ? "professor" : "aluno" }}</h2>

      <div v-if="typeProf" class="mb-4 c-white">
        Cadastre-se para poder acessar o sistema e montar provas
      </div>
      <div v-if="!typeProf" class="mb-4 c-white">
        Cadastre-se para poder acessar o sistema e responder às provas
      </div>

      <form name="form" @submit.prevent="clickRegister">
        <div class="form-group">
          <div class="d-flex align-items-center mb-4">
            <label class="label-text" for="name"> nome </label>
            <input
              v-model="user.name"
              v-validate="'required'"
              type="text"
              name="name"
              class="form-control"
            />
          </div>
          <div
            v-if="errors.has('name')"
            class="alert alert-danger"
            role="alert"
          >
            É necessário informar um nome
          </div>
        </div>
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
          <div class="d-flex justify-content-between">
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

              <span>CADASTRAR</span>
            </button>
            <div v-if="registered" class="d-flex ms-auto flex-column">
              <span class="c-white ms-auto">Cadastrado com sucesso.</span>
              <span class="c-white ms-auto"
                >Você será redirecionado para o login.</span
              >
            </div>
          </div>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger mt-3" role="alert">
            Dados não conferem
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
import UserService from "@/services/UserService";
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class FormRegister extends Vue {
  @Prop({ default: "/" }) private returned!: string;
  private user = {
    name: "",
    username: "",
    password: "",
    profesor: false,
    logged: false,
  };
  private loading = false;
  private message = "";
  private typeProf = false;
  registered = false;

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: any) => Promise<any>;

  @Auth.State("user")
  private currentUser!: any;

  created() {
    this.typeProf = this.$route.params.type == "profesor";
    // if (this.isLoggedIn && localStorage.getItem("user-fumt")) {
    //   if (this.$store.state.Auth.user) {
    //     UserService.setUser(this.$store.state.Auth.user);
    //     let userId = this.$store.state.Auth.user.id;
    //     if (this.$store.state.Auth.user.profesor) {
    //       this.$router.push(`/profesor/${userId}`);
    //       return;
    //     } else {
    //       this.$router.push(`/student/${userId}`);
    //       return;
    //     }
    //   }
    // } else {
    //   return;
    // }
  }

  clickRegister() {
    this.loading = true;
    this.$validator.validateAll().then((isValid) => {
      if (!isValid) {
        this.loading = false;
        return;
      }

      // if (this.user.username && this.user.password) {
      //   this.login(this.user).then(
      //     (data) => {
      //       data.id;
      //       if (data.profesor) {
      //         this.$router.push(`/profesor/${data.id}`);
      //       } else {
      //         this.$router.push(`/student/${data.id}`);
      //       }
      //     },
      //     (error) => {
      //       this.loading = false;
      //       this.message = error;
      //     }
      //   );
      // }
      this.user["profesor"] = this.typeProf;
      UserService.createUser(this.user).then((res) => {
        if (res) {
          this.loading = false;

          this.registered = true;
          setTimeout(() => {
            this.$router.push(`/login/${this.$route.params.type}`);
          }, 5000);
        }
      });
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
