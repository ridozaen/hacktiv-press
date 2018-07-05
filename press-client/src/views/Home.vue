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
                        <a href="#">{{article.userId.username}}</a>
                    </span>
                    <span class="date-sep">/</span>
                    <span class="post-category">
                        <a href="#">{{article.category}}</a>
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
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
import swal from "sweetalert2";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      articles: []
    };
  },
  methods: {
    getAllArticles() {
      console.log("get all articles");
      axios
        .get("/api/articles")
        .then(response => {
          console.log(response.data);
          this.articles = response.data.articles;
        })
        .catch(err => {
          console.log(err);
          swal({
            type: "error",
            title: "Oops...",
            text: err
          });
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
    }
  },
  created() {
    console.log("created home");
    this.getAllArticles();
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato|Raleway");
body {
  background: #353e49;
  border: none;
  color: #555;
  font-family: "Lato", "Helvetica Neue", sans-serif;
  font-size: 17px;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: subpixel-antialiased;
}
body a {
  color: #ff706c;
  text-decoration: none;
}
body a:hover {
  color: #ff706c;
  text-decoration: none;
}
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
h1,h2,h3,h4,
h5,
h6,
p,
blockquote,
address,
big,
cite,
code,
em,
font,
img,
small,
strike,
sub,
sup,
li,
ol,
ul,
fieldset,
form,
label,
legend,
button,
table,
caption,
tr,
th,
td {
  margin: 0;
  padding: 0;
  border: 0;
  font-weight: normal;
  font-style: normal;
  font-size: 100%;
  line-height: 1;
  font-family: inherit;
  text-align: left;
}
.blog-header {
  text-align: center;
  margin-top: 100px;
  margin-left: 50px;
}
.blog-title a {
  color: #fff;
  display: block;
  font-family: "Raleway", sans-serif;
  font-size: 1.75em;
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 120%;
  margin-bottom: 10px;
  text-transform: uppercase;
}
.blog-title a:hover {
  color: #ff706c;
}
.blog-description {
  color: rgba(255, 255, 255, 0.5);
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  line-height: 120%;
}
.blog-menu {
  padding-top: 15%;
  padding-bottom: 15%;
  margin-top: 15%;
  margin-bottom: 15%;
  background: #272f38;
  border-radius: 8px 0 0 8px;
}
.blog-menu a {
  position: relative;
  display: block;
  padding: 8px 0;
  color: #fff;
}
.blog-menu a:hover {
  padding-left: 10px;
  color: #ff706c;
}
.blog-menu .current-menu-item > a {
  color: #ff706c;
}
.blog-menu .current-menu-item a:hover {
  padding-left: 0;
}
.blog-menu .sub-menu,
.blog-menu .children {
  margin-left: 25px;
}
.post-header {
  margin-top: 6%;
  margin-bottom: 6%;
}
.post-meta {
  font-size: 0.8em;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.post-meta.light {
  text-align: center;
  margin-bottom: 20px;
}
.post-meta a {
  color: #999;
}
.post-meta a:hover {
  color: #ff706c;
}
.post-meta .date-sep {
  margin: 0 5px;
  color: #ddd;
}
.post-title {
  font-size: 2.3em;
  line-height: 120%;
  margin-bottom: 15px;
  font-weight: 700;
  color: #272f38;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
}
.post-title a {
  color: #272f38;
}
ul,
menu,
dir {
  display: block;
  list-style-type: disc;
  -webkit-margin-before: 1em;
  -webkit-margin-after: 1em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  -webkit-padding-start: 40px;
}
post-content {
  font-size: 1.075em;
  white-space: pre-wrap;
}
.post-content a:hover {
  text-decoration: underline;
}
.post-content p,
.post-content blockquote,
.post-content ul,
.post-content ol,
.post-content address,
.post-content dl,
.post-content .wp-caption,
.post-content pre {
  line-height: 170%;
  margin-bottom: 1.1em;
}
.post-content > *:first-child {
  margin-top: 0;
}
.post-content *:last-child {
  margin-bottom: 0;
}
.post-content h1,
.post-content h2,
.post-content h3,
.post-content h4,
.post-content h5,
.post-content h6 {
  margin: 50px 0 25px;
  color: #444;
  line-height: 120%;
}
.post-content h1 {
  font-size: 2em;
  font-weight: 700;
}
.post-content h2 {
  font-size: 1.75em;
  font-weight: 700;
}
.post-content h3 {
  font-size: 1.5em;
  font-weight: 700;
}
.post-content h4 {
  font-size: 1.25em;
}
.post-content h5 {
  font-size: 1.1em;
}
.post-content h6 {
  font-size: 0.9em;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.post-content h1 + h1,
.post-content h1 + h2,
.post-content h1 + h3,
.post-content h1 + h4,
.post-content h1 + h5,
.post-content h1 + h6,
.post-content h2 + h1,
.post-content h2 + h2,
.post-content h2 + h3,
.post-content h2 + h4,
.post-content h2 + h5,
.post-content h2 + h6,
.post-content h3 + h1,
.post-content h3 + h2,
.post-content h3 + h3,
.post-content h3 + h4,
.post-content h3 + h5,
.post-content h3 + h6,
.post-content h4 + h1,
.post-content h4 + h2,
.post-content h4 + h3,
.post-content h4 + h4,
.post-content h4 + h5,
.post-content h4 + h6,
.post-content h5 + h1,
.post-content h5 + h2,
.post-content h5 + h3,
.post-content h5 + h4,
.post-content h5 + h5,
.post-content h5 + h6,
.post-content h6 + h1,
.post-content h6 + h2,
.post-content h6 + h3,
.post-content h6 + h4,
.post-content h6 + h5,
.post-content h6 + h6 {
  margin-top: 25px;
}
.post-content blockquote {
  padding: 1em;
  font-size: 1.1em;
  line-height: 150%;
  color: #666;
  background: #eee;
  font-family: "Raleway", "Helvetica Neue", sans-serif;
}
.post-content cite {
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  line-height: 140%;
  color: #666;
  font-size: 0.9rem;
}
.post-content cite:before {
  content: "â€” ";
}
.post-content blockquote cite {
  display: block;
  margin-top: 1em;
}
.post-content blockquote cite em {
  font-style: italic;
  font-weight: bold;
}
em,
q {
  font-style: italic;
}
.post-content strong em,
.post-content em strong {
  font-weight: bold;
  font-style: italic;
}
.post-content big {
  font-size: 1.25em;
}
abbr,
acronym {
  cursor: help;
}
code,
kbd,
pre {
  font-size: 0.85em;
  background: #eee;
  font-family: Menlo, Monaco, monospace;
}
.post-content .highlight {
  background: #fcf8a5;
  width: auto;
  display: inline;
  padding: 2px 3px;
}
.post-content kbd,
.post-content code {
  padding: 5px;
  border-radius: 3px;
}
.post-content dl {
  line-height: 160%;
}
.post-content dl dt {
  font-weight: bold;
}
.post-content hr {
  width: 100%;
  height: 4px;
  background: #272f38;
  margin: 5em auto;
  border: 0;
}
.post-content ul {
  list-style: disc;
  margin-left: 1.5em;
}
.post-content ul ul {
  list-style: circle;
}
.post-content ul ul ul {
  list-style: square;
}
.post-content ol {
  list-style: decimal;
  margin-left: 1.5em;
}
.post-content ol ol {
  list-style: lower-alpha;
}
.post-content ol ol ol {
  list-style: lower-roman;
}
.post-content ul ul,
.post-content ul ol,
.post-content ol ul,
.post-content ol ol {
  margin-bottom: 0;
}
.post-content li {
  margin-bottom: 0.5em;
  line-height: 170%;
}
.post-content ul ul li,
.post-content ul ol li,
.post-content ol ul li,
.post-content ol ol li {
  margin-top: 0.5em;
}
.post-content ol > li:last-child,
.post-content ul > li:last-child {
  margin-bottom: 0;
}
.post-content address {
  padding: 3% 3.5%;
  background: #f1f1f1;
}
.post-content pre {
  white-space: pre-wrap;
  /* css-3 */
  white-space: -moz-pre-wrap;
  /* Mozilla, since 1999 */
  white-space: -pre-wrap;
  /* Opera 4-6 */
  white-space: -o-pre-wrap;
  /* Opera 7 */
  word-wrap: break-word;
  /* Internet Explorer 5.5+ */
  line-height: 140%;
  padding: 2% 2.5%;
  background: #f1f1f1;
}
.post-content a.more-link {
  display: inline-block;
  background: #272f38;
  padding: 15px 18px 18px;
  color: #fff;
  font-size: 0.85em;
  line-height: 1;
  border-radius: 4px;
}
.post-content a.more-link:hover {
  background: #ff706c;
  color: #fff;
  text-decoration: none;
}
.archive-nav {
  padding: 1% 3%;
  background: #eee;
  font-size: 0.9em;
}
.archive-nav a {
  margin: 0;
  padding: 14px 16px;
  background: #353e49;
  float: left;
  border-radius: 4px;
  color: #fff;
}
.archive-nav a:hover {
  background: #ff706c;
  color: #fff;
}
.archive-nav .post-nav-older {
  margin-right: 10px;
}
.archive-nav .post-nav-newer {
  float: right;
  text-align: right;
  margin-left: 10px;
}
.credits {
  background: #fff;
  color: #777;
  padding: 3% 3%;
  font-size: 0.6rem;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1px;
}
.credits a {
  color: #777;
}
</style>

</style>

