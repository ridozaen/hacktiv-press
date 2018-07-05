<template>
    <div class="col-sm-8 bg-white content">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 offset-sm-2 p-2 mt-5">
                    <div class="card">
                        <article class="card-body">
                            <router-link class="float-right btn btn-outline-info" to="/register">Sign up</router-link>
                            <h4 class="card-title mb-4 mt-1">Sign in</h4>
                            <hr>
                            <form>
                                <div class="form-group" :class="{invalid: $v.username.$error}">
                                    <input name="username" class="form-control" placeholder="username" type="username"
                                    @blur="$v.username.$touch()"
                                    v-model="username">
                                    <p v-if="!$v.username.required  && $v.username.$dirty" class="error">Field is required</p>
                                </div> <!-- form-group// -->
                                <div class="form-group" :class="{invalid: $v.password.$error}">
                                    <input name="password" class="form-control" placeholder="password" type="password"
                                    @blur="$v.password.$touch()"
                                    v-model="password">
                                    <p v-if="!$v.password.required && $v.password.$dirty" class="error">Field is required</p>
                                </div> <!-- form-group// -->                                      
                                <div class="form-group">
                                    <button type="submit" class="btn btn-info btn-block" @click.prevent="login"> Login  </button>
                                </div> <!-- form-group// --> 
                                <div class="alert alert-danger" v-if="submitStatus === 'ERROR'">
                                    {{messages}}
                                </div>
                                <div class="alert alert-success" v-if="submitStatus === 'OK'">
                                    {{messages}}
                                </div>
                                <div class="alert alert-info" v-if="submitStatus === 'PENDING'">
                                    {{messages}}
                                </div>                                                               
                            </form>
                        </article>
                    </div> <!-- card.// -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { required, username } from "vuelidate/lib/validators";
import axios from "axios";
import { eventBus } from "../main";

export default {
  /* eslint-disable */
  data() {
    return {
      username: "",
      password: "",
      token: null,
      submitStatus: null,
      messages: null
    };
  },
  validations: {
    username: {
      required,
    },
    password: {
      required
    }
  },
  methods: {
    login: function() {
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        this.messages = "Please fill the form correctly";
      } else {
        let loginData = {
          username: this.username,
          password: this.password,
          fbId: this.fbId
        };
        axios
          .post(`/login`, loginData)
          .then(result => {
            console.log(result);
            this.token = result.data.token;
            this.username = result.data.username;
            localStorage.setItem("curr-token", this.token);
            localStorage.setItem("curr-username", this.username);
            eventBus.$emit("triggerLogin", localStorage.getItem("curr-token"));
            this.submitStatus = "OK";
            this.messages = `Thanks  for your submission!`;
            this.$router.push({ name: "admin" });
          })
          .catch(err => {
            //   console.log(err.response.data);
            let error = err.response.data.error.message;
            this.submitStatus = "ERROR";
            this.messages = `${error}`;
          });
        this.submitStatus = "PENDING";
        this.messages = "Sending...";
      }
    },
  },
  created: function() {
    this.token = localStorage.getItem("curr-token");
    if (this.token) {
      this.$router.push({ name: "admin" });
    }
  }
};
</script>
<style scoped>
.form-group.invalid input {
  border: 1px solid red;
  background-color: #f2dede;
}

.form-group input:focus {
  border: none;
  outline: 0;
  box-shadow: 0px;
}
.error {
  font-size: 11px;
  color: red;
}

.alert {
  font-size: 12px;
}
</style>

