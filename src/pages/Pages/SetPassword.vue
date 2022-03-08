<template>
  <div class="container">
    <div class="col-md-6 ml-auto mr-auto">
      <img
        class="card-title"
        style="margin-left: auto; margin-right: auto; display: block"
        src="img/vectolabs.png"
        height="140px"
      />
      <card class="card-first-time">
        <div
          style="text-align: center; padding-top: 5%; margin-bottom: 10px"
        ></div>

        <h1 class="first-title" v-if="isFirstTime">First Time Login</h1>
        <h1 class="first-title" v-else>Reset Password</h1>
        <h4 style="color: grey">
          Please enter your password you'd like to use for the Transporter
          Dashboard
        </h4>

        <label class="first-label">Password</label>
        <div>
          <input
            class="input-field-first"
            v-validate="'required|min:5'"
            name="username"
            v-model="model.password"
            addonRightIcon="fa fa-eye"
            type="password"
          />
        </div>
        <label class="first-label">Confirm Password</label>
        <div>
          <input
            class="input-field-first"
            v-validate="'required|min:5'"
            name="password"
            v-model="model.confirmPassword"
            addonRightIcon="fa fa-eye"
            type="password"
          />
        </div>

        <div class="pull-right">
          <button @click="setPassowrd" class="login-btn">Submit</button>
        </div>
        <!-- <div class="separator">OR</div>
          <button @click="firstTime" class="first-login-btn">
            First Time Login
          </button> -->
      </card>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert2";
export default {
  data() {
    return {
      isFirstTime: false,
      token: "",
      model: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async setPassowrd() {
      if (this.model.password != this.model.confirmPassword)
        return swal({
          type: "error",
          title: "Password does not match!",
        });

      let payload = {
        Token: this.token,
        Password: this.model.password,
      };

      let res = await this.$http.post(":6768/auth/set-password", payload);
      console.log(res);
      if (!res.error) {
        this.$router.push("/login");
      } else {
        swal({
          type: "error",
          title: res.message,
        });
      }
    },
  },
  created() {
    this.isFirstTime = this.$route.query.isFirstTime === "true";
    this.token = this.$route.params.token;
    console.log(this.token);
  },
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}

/* .card-first-time > p {
  font-size: 38px;
  font: 900;
  color: black;
  margin-bottom: 30px;
} */

.input-field-first {
  width: 100%;
  padding: 5px;
  padding-top: 0px;
  text-align: left;
  /* border-radius: 50px; */
  border-bottom: 1px solid #c7c7c7;
  border-left: none;
  border-right: none;
  border-top: none;
  background: transparent;
  color: grey;
  margin-bottom: 5px;
  /* color: #e6e6e6; */
}

.input-field-first:focus {
  outline: none;
  padding-top: 0px;
  color: grey;
  /* border: 1px solid #00f2c3; */
  border-bottom: 1px solid #c7c7c7;
  border-left: none;
  border-right: none;
  background: transparent;
  margin-bottom: 5px;
  border-top: none;
  font: bold;
}

.first-title {
  color: #2e2e2e !important;
  font: bold !important;
  margin-bottom: 10px !important;
}

.first-label {
  font-size: 13px !important;
  font: bold !important;
  color: grey !important;
  padding: 10px 0px !important;
}

.checkbox-round {
  width: 1.3em;
  height: 1.3em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid #ddd;
  outline: none;
  cursor: pointer;
}

.login-btn {
  border-radius: 20px;
  color: white;
  background-color: #15cf79;
  border: none;
  padding: 7px;
  text-align: center;
  width: 140px;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  top: 50%;
  margin: 6px;
}

.first-login-btn {
  border-radius: 20px;
  color: grey;
  background-color: white;
  border: none;
  padding: 7px;
  text-align: center;
  width: 140px;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  top: 50%;
  margin: 6px;
  margin-bottom: 10px;
}

.vertical-center {
  margin: 0;
}
</style>
