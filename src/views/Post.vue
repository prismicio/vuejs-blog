<template>
  <div class="main">
    <div class="outer-container">
      <div class="back">
        <router-link to="./">back to list</router-link>
      </div>
      <!-- Button to edit document in dashboard -->
      <prismic-edit-button :documentId="documentId"/>

      <h1 class="blog-title">{{ $prismic.richTextAsPlain(fields.title) }}</h1>
      <p class="blog-post-meta"><span class="created-at">{{ fields.date }}</span></p>

    </div>
      <!-- Slice section template -->
      <section v-for="(slice, index) in slices" :key="'slice-' + index">
        <!-- Text slice template -->
        <template v-if="slice.slice_type === 'text'">
          <text-slice :text="slice.primary.text"></text-slice>
        </template>
        <!-- Quote slice template -->
        <template v-else-if="slice.slice_type === 'quote'">
          <quote-slice :quote="slice.primary.quote"></quote-slice>
        </template>
        <!-- Image with caption slice template -->
        <template v-else-if="slice.slice_type === 'image_with_caption'">
          <image-caption-slice 
          :img="slice.primary.image"
          :size="slice.slice_label"
          :caption="slice.primary.caption"
          ></image-caption-slice>
        </template>
      </section>
  </div>
</template>

<script>
import TextSlice from '../components/slices/TextSlice.vue'
import QuoteSlice from '../components/slices/QuoteSlice.vue'
import ImageCaptionSlice from '../components/slices/ImageCaptionSlice.vue'

export default {
  name: 'post',
  components: {
    TextSlice,
    QuoteSlice,
    ImageCaptionSlice
  },
  data () {
    return {
      documentId: '',
      fields: {
        title: null,
        date: null,
      },
      slices: []
    }
  },
  methods: {
    getContent (uid) {
      //Query to get post content
      this.$prismic.client.getByUID('post', uid)
        .then((document) => {
          if (document) {
            this.documentId = document.id
            this.fields.title = document.data.title
            this.fields.date = document.data.date
            
            //Set slices as variable
            this.slices = document.data.body
          } 
          else {
            //returns error page
            this.$router.push({ name: 'not-found' })
          }
        })
    }
  },
  created () {
    this.getContent(this.$route.params.uid)
  },
  beforeRouteUpdate (to, from, next) {
    this.getContent(to.params.uid)
    next()
  }
}
</script>

<style scoped>
.outer-container {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0;
}
/*
 * Blog posts
 */
.back {
  color: #9A9A9A;
  display: block;
  max-width: 700px;
  margin: 0 auto 2em auto;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
}
.back:before {
  content: '←';
  display: inline-block;
  position: relative;
  margin-right: 8px;
}
.back a {
  color: #9A9A9A;
}
.back a:hover {
  text-decoration: underline;
}
.post-part.single a, .blog-main.single a {
  text-decoration: none;
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%);
  background-repeat: repeat-x;
  background-size: 2px 2px;
  background-position: 0 23px;
}
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

/* Media Queries */
@media (max-width: 767px) {
  .outer-container {
    padding: 20px;
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
</style>