<template>
  <div class="container">
    <div class="col-md-6 ml-auto mr-auto">
      <card class="card-transparent">
        <div style="text-align: center; padding-top: 5%; margin-bottom: 10px">
          <img class="card-title" src="img/vectolabs.png" height="140px" />
        </div>

        <div>
          <p class="welcome">Welcome Back</p>
        </div>

        <label>Email</label>
        <div>
          <input
            class="input-field"
            v-validate="'required|min:5'"
            name="username"
            v-model="model.email"
            addonRightIcon="fa fa-eye"
          />
        </div>
        <label>Password</label>
        <div class="input-group">
          <input
            class="input-field"
            v-validate="'required|min:5'"
            name="password"
            v-model="model.password"
            addonRightIcon="fa fa-eye"
            :type="isHide"
          />
          <div slot="append" class="eyes">
            <i class="fa fa-eye" aria-hidden="true" @click="hidePassword()"></i>
          </div>
        </div>
        <div class="pull-left">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
        </div>
        <div class="pull-right">
          <h5>
            <router-link
                style="color: white"
                class="link footer-link"
                to="/forgot-password"
              >
            Forgot Password?
            </router-link>
          </h5>
        </div>
        <div slot="footer">
          <button @click="login" class="login-btn">Login</button>
          <!-- <div class="separator">OR</div>
          <button @click="firstTime" class="first-login-btn">
            First Time Login
          </button> -->
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import swal from "sweetalert2";
export default {
  data() {
    return {
      isHide: "password",
      model: {
        email: "",
        password: "",
        subscribe: true,
      },
    };
  },
  methods: {
    hidePassword() {
      if (this.isHide == "text") {
        this.isHide = "password";
      } else {
        this.isHide = "text";
      }
    },
    getError(fieldName) {
      return this.errors.first(fieldName);
    },
    async login() {
      let payload = {
        email: this.model.email,
        password: this.model.password,
      };

      let res = await this.$http.post(":6768/auth/login", payload);
      console.log(res);
      if (res == "Error: Network Error") {
        return swal({
          type: "error",
          title: "Wrong username or password!",
        });
      }
      if (!res.error) {
        sessionStorage.setItem("token", res.message.jwt_token);
        this.$router.push("/dashboard");
        // let isValidForm = await this.$validator.validateAll();
      } else {
        sessionStorage.removeItem("token");
        swal({
          type: "error",
          title: res.message,
        });
      }
    },
  },
};
</script>
<style>
.separator {
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid rgb(167, 167, 167);
}

.separator:not(:empty)::before {
  margin-right: 0.25em;
}

.separator:not(:empty)::after {
  margin-left: 0.25em;
}
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
.card-transparent {
  color: rgba(0, 0, 0, 0.349);
  padding-bottom: 60px;
  border-radius: 15px;
}
.input-field {
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
  color: white;
  margin-bottom: 5px;
  /* color: #e6e6e6; */
}

.input-field:focus {
  outline: none;
  padding-top: 0px;
  color: white;
  /* border: 1px solid #00f2c3; */
  border-bottom: 1px solid #c7c7c7;
  border-left: none;
  border-right: none;
  background: transparent;
  margin-bottom: 5px;
  border-top: none;
  font: bold;
}

.eyes {
  position: absolute;
  right: 10px;
  color: white;
}

.eyes:active {
  position: absolute;
  right: 10px;
  color: #15cf79;
}

.welcome {
  font-size: 38px;
  font: 900;
  color: #b7b7b7;
  margin-bottom: 30px;
}

.label {
  font-size: 13px;
  font: bold;
  color: #b7b7b7;
  margin-bottom: 0px;
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

.checkbox-round:checked {
  background-color: green;
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
