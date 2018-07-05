<template>
    <div class="col-sm-8 bg-white content">
        <div class="container">
            <div class="row">
                <div class="col-sm-12 p-2 mt-5">
                    <div class="card">
                        <article class="card-body">
                            <h4 class="card-title mb-4 mt-1 text-center"
                            v-if="['addArticle'].indexOf($route.name) > -1">Add Article</h4>
                            <h4 class="card-title mb-4 mt-1 text-center"
                            v-else>Edit Article</h4>
                            <hr>
                            <form>
                                <div class="form-group" :class="{invalid: $v.title.$error}">
                                    <input name="title" class="form-control" placeholder="title" type="title"
                                    v-model="title">
                                    <p v-if="!$v.title.required  && $v.title.$dirty" class="error">Field is required</p>
                                </div> <!-- form-group// -->
                                <div class="form-group">
                                <input id="image" name="image" type="file" placeholder="image" class="form-control"
                                ref="file"
                                @change="onFileChange">
                                </div>
                                <div class="form-group" :class="{invalid: $v.category.$error}">
                                    <input name="category" class="form-control" placeholder="category" type="category"
                                    v-model="category">
                                    <p v-if="!$v.category.required  && $v.category.$dirty" class="error">Field is required</p>
                                </div>
                                <div class="form-group" :class="{invalid: $v.content.$error}">
                                    <Vueditor></Vueditor>
                                </div> <!-- form-group// -->                                      
                                <div class="form-group">
                                    <button type="submit" class="btn btn-warning btn-block" @click.prevent="addArticle"
                                    v-if="['addArticle'].indexOf($route.name) > -1"> Add Article  </button>
                                    <button type="submit" class="btn btn-warning btn-block" @click.prevent="editArticle"
                                    v-else> Edit Article  </button>
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
import { required, numeric } from "vuelidate/lib/validators";
import axios from "axios";
import swal from "sweetalert2";

export default {
  data() {
    return {
      title: "",
      content: "",
      category: "",
      imageUrl: "",
      file: "",
      token: "",
      submitStatus: null,
      messages: null
    };
  },
  validations: {
    title: {
      required
    },
    content: {
      required
    },
    category: {
      required
    }
  },
  methods: {
    addArticle() {
      console.log("add article", this.$children[0].getContent());
      //check each validation
      this.content = this.$children[0].getContent()
      this.$v.title.$touch();
      this.$v.content.$touch();
      this.$v.category.$touch();

      // //if valid then do axios
      if (this.$v.$invalid) {
        console.log("still invalid");
      } else {
        let formData = new FormData();
        formData.append("title", this.title);
        formData.append("image", this.file);
        formData.append("content", this.content);
        formData.append("category", this.category);

        const token = this.token
        axios
          .post("/api/articles/add", formData, {
            "Content-Type": "multipart/form-data",
            headers: {
              authorization:
                token
            }
          })
          .then(response => {
            console.log(response.data);
            this.submitStatus = "OK";
            this.messages = `Thanks  for your submission!`;
            this.$router.push({ name: "admin" });
          })
          .catch(err => {
            console.log(err.response);
            swal({
              type: "error",
              title: "Oops...",
              text: err
            });
          });
        this.submitStatus = "PENDING";
        this.messages = "Sending...";
      }
    },
    editArticle() {
      console.log("edit Article");
      //check each validation
      this.$v.title.$touch();
      this.$v.content.$touch();
      if (this.$v.$invalid) {
        console.log("still invalid");
      } else {
        console.log("file", this.file);
        let formData = new FormData();
        formData.append("title", this.title);
        formData.append("image", this.file);
        formData.append("content", this.content);
        formData.append("category", this.category);

        const id = this.$route.params.id;
        const token = this.token
        console.log('token', token)
        axios
          .put(`/api/articles/update/${id}`, formData, {
            "Content-Type": "multipart/form-data",
            headers: {
              authorization: token
            }
          })
          .then(response => {
            console.log(response.data);
            this.submitStatus = "OK";
            this.messages = `Item Successfully updated!`;
            this.$router.push({ name: "admin" });
          })
          .catch(err => {
            console.log(err.response);
            this.submitStatus = "ERROR";
            this.messages = `${err.response.messages}`;
            swal({
              type: "error",
              title: "Oops...",
              text: err
            });
          });
        this.submitStatus = "PENDING";
        this.messages = "Sending...";
      }
    },
    onFileChange(e) {
      console.log(e.target.files[0]);
      this.file = e.target.files[0];
      this.imageUrl = e.target.files[0].name;
    }
  },
  created(){
    if (localStorage.getItem('curr-token')){
       this.token = localStorage.getItem('curr-token')
    }
    if (this.$route.params.id) {
      console.log("edit mode : params id", this.$route.params.id);
      this.editMode = true;
      const id = this.$route.params.id;
      axios
        .get(`/api/articles/${id}`)
        .then(response => {
          console.log(response.data.article);
          const article = response.data.article;
          this.title = article.title;
          this.imageUrl = article.imageUrl;
          this.content = article.content;
          this.category = article.category
          this.$children[0].setContent(this.content)
          
        })
        .catch(err => {
          swal({
            type: "error",
            title: "Oops...",
            text: err
          });
        });
    }
  }
};
</script>
<style scoped>
.invalid input,
.invalid select, .invalid textarea {
  border: 1px solid red;
  background-color: #f2dede;
}
.error {
  color: red;
  font-size: 10px;
  text-align: left;
}

.vueditor{
    /* width: 200px; */
    height: 400px;
}
</style>


