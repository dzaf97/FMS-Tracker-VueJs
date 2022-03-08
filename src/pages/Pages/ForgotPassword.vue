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

        <h1 class="first-title">Forgot your password</h1>
        <h4 style="color: grey">
          Please enter the email address you'd like your password reset
          information sent to
        </h4>

        <label class="first-label">Enter email address</label>
        <div>
          <input
            class="input-field-first"
            v-validate="'required|min:5'"
            v-model="email"
            addonRightIcon="fa fa-eye"
            type="text"
          />
        </div>

        <div class="col-lg text-center" style="margin-top: 20px">
          <button @click="reqLink" class="login-btn">Request reset link</button>
          <h4 style="margin-top: 5px">
            <router-link class="link footer-link" to="/login">
              Back to login
            </router-link>
          </h4>
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
      email: "",
    };
  },
  methods: {
    async reqLink() {
      let payload = {
        Email: this.email,
      };

      let res = await this.$http.post(`:6768/auth/forgot-password`, payload);
      console.log(res)



      if (res.error) {
        return swal({
          type: "error",
          title: res.message,
        });
      } else {
        return swal({
          type: "success",
          title: res.message,
        });
      }
    },
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
