<template>
  <!-- Vue conditional to check if there is any content in document -->
  <div v-if="hasContent" class="page">
    <div class="home">
      <!-- Button to edit document in dashboard -->
      <prismic-edit-button :documentId="documentId"/>
      <div class="blog-avatar" :style="{ backgroundImage: 'url(' + fields.image + ')' }">
      </div>
      <!-- Template for page title -->
      <h1 class="blog-title">
        {{ $prismic.richTextAsPlain(fields.headline) }}
      </h1>
      <!-- Template for page description -->
      <p class="blog-description">{{ $prismic.richTextAsPlain(fields.description) }}</p>
    </div>
    <!-- Vue reference for blog posts component -->
    <blog-posts/>
  </div>
  <!-- If no content return message -->
  <div v-else class="home">
    <p> Please add some content to your blog home document.</p>
  </div>
</template>

<script>
import BlogPosts from '../components/BlogPosts.vue'

export default {
  name: 'blog-home',
  components: {
    BlogPosts
  },
  data () {
    return {
      documentId: '',
      fields: {
        headline: null,
        description: null,
        image: null
      },
      posts: [],
      linkResolver: this.$prismic.linkResolver,
      hasContent: false
    }
  },
  methods: {
    getContent () {
      //Query to get home content
      this.$prismic.client.getSingle('blog_home')
        .then((document) => {
          if (document) {
            this.documentId = document.id
            this.fields.headline = document.data.headline;
            this.fields.description = document.data.description;
            this.fields.image = document.data.image.url;

            //Check that the blog home contains content
            this.checkForContent();

          } else {
            //returns error page
            this.$router.push({ name: 'not-found' })
          }
        })
    },
    //Function to check for any content on the blog home page
    checkForContent(){
      if (
        this.fields.image != undefined ||
        this.$prismic.richTextAsPlain(this.fields.headline) !== "" ||
        this.$prismic.richTextAsPlain(this.fields.description) !== ""
      ) {
        this.hasContent = true;
      }
    },
  },
  created () {
    this.getContent()
  }
}
</script>

<style scoped>
.home {
  max-width: 700px;
  margin: auto;
}
/* Home header */
.home {
  text-align: center;
}
.home .blog-avatar {
  height: 140px;
  width: 140px;
  border-radius: 50%;
  background-position: center;
  background-size: cover;
  margin: 1em auto;
}
.home .blog-description {
  font-size: 18px;
  color: #9A9A9A;
  line-height: 30px;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  font-family: 'Lato', sans-serif;
  border-bottom: 1px solid #DADADA;
}
/* Media Queries */
@media (max-width: 767px) {
  .home {
    padding: 0 20px;
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
</style>
