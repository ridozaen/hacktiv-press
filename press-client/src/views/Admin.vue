<template>
    <div class="col-sm-8 bg-white content">
    <main class="container pt-5">
        <div class="card mb-5">
            <div class="card-header">
                  <div class="col-sm-6 float-left">
                    Post List Panel
                  </div>
                  <div class="col-sm-6 float-right text-right">
                      <router-link :to="{name: 'addArticle'}" tag="button"
                      class="btn btn-sm btn-warning">
                        Add Item
                      </router-link>
                  </div>
            </div>
            <div class="card-block p-0">
                <table class="table table-bordered table-sm m-0">
                    <thead class="">
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Category</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="article in articles" :key="article._id">
                            <td>{{article.title}}</td>
                            <td>{{article.category}}</td>
                            <td>{{spliceContent(article.content)}}</td>
                            <td>{{formatedDate(article.createdAt)}}</td>
                            <td>
                               <router-link :to="{name: 'editArticle', params: {id: article._id}}" tag="span"
                                class="btn btn-default btn-sm btn-default">
                                    <i class="far fa-edit"></i></router-link>
                                <button class="btn btn-sm deleteIcon" @click="deleteArticle(article)"><i class="far fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-footer p-0">
                <nav aria-label="...">
                    <ul class="pagination justify-content-end mt-3 mr-3">
                        <li class="page-item disabled">
                            <span class="page-link">Previous</span>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item active">
                            <span class="page-link">2<span class="sr-only">(current)</span>
                            </span>
                        </li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item">
                            <a class="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </main>
    </div>
</template>
<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  data() {
    return {
      articles: [],
      token: null
    };
  },
  methods: {
    getAllArticles() {
      console.log("get all articles");
      let token = this.token
      let username = localStorage.getItem('curr-username')
      axios
        .get(`/api/articles`,{
            headers: {
                Authorization : token
            }
        })
        .then(response => {
          console.log(response.data);
          this.articles = response.data.articles;
        })
        .catch(err => {
          console.log(err.response);
          swal({
            type: "error",
            title: "Oops...",
            text: err
          });
        });
    },
    deleteArticle(article) {
      console.log("delete article", article);
      const id = article._id;
      swal({
        title: "Are you sure to delete?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        console.log("result", result);
        const token = this.token
        if (result.value) {
          axios
            .delete(
              `/api/articles/delete/${id}`,
              {
                headers: {
                  authorization: token
                }
              }
            )
            .then(result => {
              console.log(result);
              swal("Deleted!", "Your file has been deleted.", "success");
              let index = this.articles.findIndex(x=>x._id === article._id);
              this.articles.splice(index,1);
            })
            .catch(err => {
              console.log(err.response)
              swal({
                type: "error",
                title: "Oops...",
                text: err
              });
            });
        }
      });
    },
    formatedDate(strDate) {
      console.log(strDate);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      const date = new Date(strDate);
      return date.toLocaleDateString("en-US", options);
    },
    spliceContent(content){
        console.log('content', content)
        if(content && content.length >= 50){
           let spliceContent = content.substring(1,50)
           return spliceContent + '...'
        }
        return content
    }
  },
  created() {
    console.log('created admin')
    if(localStorage.getItem('curr-token')){
        this.token = localStorage.getItem('curr-token')
    }
    this.getAllArticles();
  }
};
</script>


<style scoped>
.table {
  border: none;
}

.table-definition thead th:first-child {
  pointer-events: none;
  background: white;
  border: none;
}

.table td {
  vertical-align: middle;
  font-size: 12px;
}

.page-item > * {
  border: none;
}

button.deleteIcon {
        color: #FF706C;
        text-decoration: none;
}

</style>

