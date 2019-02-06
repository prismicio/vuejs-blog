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