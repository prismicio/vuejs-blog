<template>
  <!-- Check blog posts exist -->
  <div v-if="posts.length !== 0" class="blog-main">
    <!-- Template for blog posts -->
    <div v-for="post in posts" :key="post.id" v-bind:post="post" class="blog-post">
      <router-link :to="linkResolver(post)">
        <h2>{{ $prismic.richTextAsPlain(post.data.title) }}</h2>
        <p class="blog-post-meta"><span class="created-at">{{ post.data.date }}</span></p>
        <div>
          <p>{{getFirstParagraph(post)}}</p>
        </div>
      </router-link>
    </div>
  </div>
  <!-- If no blog posts return message -->
  <div v-else class="blog-main">
    <p>No Posts published at this time.</p>
  </div>
</template>

<script>
export default {
  name: 'blog-posts',
  data () {
    return {
      posts: [],
      linkResolver: this.$prismic.linkResolver
    }
  },
  methods: {
    getPosts () {
      //Query to get blog posts
      this.$prismic.client.query(
        this.$prismic.Predicates.at('document.type', 'post'),
        { orderings : '[my.post.date desc]' }
      ).then((response) => {
        this.posts = response.results;
      })
    },
    //Function to get the first paragraph of text in a blog post and limit the displayed text at 300 characters
    getFirstParagraph (post) {
      const textLimit = 300;
      const slices = post.data.body;
      let firstParagraph = '';
      let haveFirstParagraph = false;

      slices.map(function(slice) {
        if (!haveFirstParagraph) {
          if (slice.slice_type == "text") {
            slice.primary.text.forEach(function(block){
              if (block.type == "paragraph") {
                if (!haveFirstParagraph) {
                  firstParagraph += block.text;
                  haveFirstParagraph = true;
                }
              }
            });
          }
        }
      });
      
      const limitedText = firstParagraph.substr(0, textLimit)

      if (firstParagraph.length > textLimit) {
        return limitedText.substr(0, limitedText.lastIndexOf(' ')) + '...';
      }
      else {
        return firstParagraph;
      }
    },
  },
  created () {
    this.getPosts()
  }
}
</script>

<style scoped>
.post-part.single a, .blog-main.single a {
  text-decoration: none;
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%);
  background-repeat: repeat-x;
  background-size: 2px 2px;
  background-position: 0 23px;
}
.blog-main {
  max-width: 700px;
  margin: auto;
}
/*
 * Blog posts
 */
.blog-post {
  margin-bottom: 3rem;
}
.blog-post h2 {
  margin: 0;
}
.blog-post-meta {
  color: #9A9A9A;
  font-family: 'Lato', sans-serif;
  margin-bottom: 8px;
}
.blog-main.single img {
  width: 100%;
  height: auto;
}
/* Media Queries */
@media (max-width: 767px) {
  .blog-main {
    padding: 0 20px;
  }
  .post-part, .blog-main {
    font-size: 18px;
  }
  .post-part pre {
    font-size: 14px;
  }
  h1 {
    font-size: 36px;
    line-height: 45px;
  }
  h2 {
    font-size: 28px
  }
  h3 {
    font-size: 18px;
  }
  .blog-post-meta, .blog-post-meta {
    font-size: 16px;
  }
}
@media screen and (min-width: 768px) {
  .blog-post-meta {
    font-size: 16px;
  }
}

/* vh vw fallback for ios7 */
@media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
  .main .blog-main.single .image-full-width {
    width: 768px;
  }
}

@media all and (device-width: 768px) and (device-height: 1024px) and (orientation:landscape){
  .main .blog-main.single .image-full-width {
    width: 768px;
  }
}

@media screen and (device-aspect-ratio: 40/71) {
  .main .blog-main.single .image-full-width {
    width: 530px;
  }
}
</style>