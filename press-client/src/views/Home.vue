<template>
    <div class="col-sm-8 bg-white content">
        <div class="col-sm-12 post" v-for="(article,index) in articles" :key="index">
            <div class="featured-media my-5 p-5" v-if="article.imageUrl">
                <img class="img-fluid rounded"
                :src="article.imageUrl"
                    alt="" srcset="">
            </div>
            <div class="post-header">
                <h2 class="post-title">
                    <a href="#">{{article.title}}</a>
                </h2>
                <div class="post-meta">
                    <span class="post-date">
                        <a href="#">{{formatedDate(article.createdAt)}}</a>
                    </span>
                    <span class="date-sep">/</span>
                    <span class="post-author">
                        <!-- <a href="#">{{(article.userId.username) }}</a> -->
                      <router-link :to="{name:'category', query: {author: article.userId.username}}">
                           <span @click="authorClick(article)"> {{article.userId.username}}</span>
                      </router-link>
                    </span>
                    <span class="date-sep">/</span>
                    <span class="post-category">
                      <router-link :to="{name:'category', query: {category: article.category}}">
                           <span @click="categoryClick(article)"> {{article.category}}</span>
                      </router-link>
                    </span>
                </div>
            </div>
            <div class="post-content">
                <p v-html="article.content">{{article.content}}</p>
                <hr class="post-separator">
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import swal from 'sweetalert2'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data(){
    return{
      articles: []
    }
  },
  methods: {
    getAllArticles(){
      console.log('get all articles')
      axios.get('/api/articles')
      .then(response=>{
        console.log(response.data)
        this.articles = response.data.articles
      })
      .catch(err=>{
        console.log(err)
        swal({
          type: 'error',
          title: 'Oops...',
          text: err,
        })
      })
    },
    categoryClick(article){
      console.log(article);
      const filteredArticle = this.articles.filter(x => x.category.toLowerCase() === article.category.toLowerCase())
      this.articles = filteredArticle;
    },
    authorClick(article){
      console.log('article', article)
      const filteredArticle = this.articles.filter(x => x.userId.username === article.userId.username)
      this.articles = filteredArticle;
    },
    formatedDate(strDate){
      console.log(strDate);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date  = new Date(strDate);
      return date.toLocaleDateString("en-US", options)
    }
  },
  created(){
    console.log('created home')
    this.getAllArticles()
  }
}
</script>
