<template>
    <div class="col-sm-8 bg-white content">
    <div class="container">
        <div class="row">
            <div class="col-sm-6 offset-sm-3 p-2 mt-5">
                <div class="card">
                    <article class="card-body">
                        <router-link to="/login" class="float-right btn btn-outline-warning">Sign in</router-link>
                        <h4 class="card-title mb-4 mt-1">Sign up</h4>
                        <form>
                            <div class="form-group" :class="{invalid: !$v.username.required && $v.username.$dirty}">
                                <input type="text" name="username" class="form-control" placeholder="username"
                                @blur="$v.username.$touch()"
                                v-model="username">
                                <p v-if="!$v.username.required && $v.username.$dirty" class="error">Field is required</p>
                            </div> <!-- form-group// -->
                            <div class="form-group" :class="{invalid: $v.password.$error}">
                                <input name="password" class="form-control" placeholder="password" type="password"
                                @blur="$v.password.$touch()" v-model="password">
                                <p v-if="!$v.password.required && $v.password.$dirty" class="error">Field is required</p>
                                <p v-else-if="!$v.password.minLength" class="error">Password minimun 6 character</p>
                                <p v-else-if="!$v.password.alphaNum && $v.password.$dirty" class="error">The Password must contain at least 1 numeric character</p>
                            </div>                                   
                            <div class="form-group">
                                <button type="submit" class="btn btn-warning btn-block" @click.prevent="register"> Register  </button>
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
                    <div class="border-top card-body text-center">Have an account? <router-link to="/login">Log In</router-link></div>
                </div> <!-- card.// -->
            </div>
        </div>
    </div>
    </div>
</template>
 
<script>
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";

const alphaNum = value => {
  return /(?=.*?[0-9])/.test(value);
};
export default {
  data() {
    return {
      username: "",
      password: "",
      submitStatus: null,
      messages: null
    };
  },
  validations: {
    username: {
      required
    },
    password: {
      required,
      minLength: minLength(6),
      alphaNum
    }
  },
  methods: {
    register: function() {
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        this.messages = "Please fill the form correctly";
      } else {
        let regData = {
            username: this.username,
            password: this.password,
        }
        axios.post(`/api/register`,regData)
        .then(result=>{
            console.log(result)
            // let name = result.data.user.name
            this.submitStatus = "OK";
            this.messages = `Thanks ${name} for your submission!`
            this.$router.push({ name: 'login' })
        })
        .catch((e)=>{
            console.log('error:',e);
            this.submitStatus = "ERROR";
            this.messages = e;
        })
        this.submitStatus = "PENDING";
        this.messages = "Sending...";
      }
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

