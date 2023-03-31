<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div
        class="card bg-secondary shadow border-0 vld-parent"
        ref="formContainer"
      >
        <div class="card-header bg-transparent pb-4 pt-4">
          <img
            class="mx-auto d-block img-fluid"
            width="40%"
            src="/img/brand/baita_design_logo.png"
          />
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Entre com suas credenciais</small>
          </div>
          <form role="form" @submit="handleSignIn">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            >
            </base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Senha"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            >
            </base-input>

            <base-checkbox class="custom-control-alternative text-right mr-1">
              <span class="text-muted ml--3">Lembrar-me</span>
            </base-checkbox>
            <base-alert type="danger" class="text-center mt-4 mb-0" v-if="error"
              ><i class="fas fa-exclamation-circle mr-1"></i>
              {{ error }}</base-alert
            >

            <div class="text-center">
              <base-button
                nativeType="submit"
                class="mt-4 px-5"
                type="default"
                title="Entrar no Baita Design"
                >Entrar</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <div class="row my-3">
        <div class="col-12">
          <router-link to="/forgot-password" class="text-light float-right"
            ><small>Esqueceu sua senha?</small></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../services/api";
import { login } from "../services/auth";

export default {
  name: "login",
  data() {
    return {
      model: {
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    async handleSignIn(e) {
      e.preventDefault();
      const user = this.model;
      user.email = user.email.trim();
      if (!user.email || !user.password) {
        this.error = "Preencha seu email e senha para continuar.";
      } else {
        let loader = this.$loading.show({
          container: this.$refs.formContainer,
          width: 128,
          height: 128,
        });
        try {
          const { data } = await api.post("/sessions", user);
          login(data.user.token, data.roles);
          const rolesMap = {
            admin: "admin",
            company: "empresa",
            collaborator: "colaborador",
          };

          this.$router.push(`/${rolesMap[data.roles[0]]}`);
          this.$toasted.show("Bem-vindo! :)");
        } catch (err) {
          this.error =
            "Houve um problema com o login, verifique suas credenciais.";
          this.$toasted.error("Ocorreu um erro com com o login");
        } finally {
          loader.hide();
        }
      }
    },
  },
};
</script>
<style scoped></style>
