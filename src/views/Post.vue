<template>
  <div class="main">
    <div class="outer-container">
      <div class="back">
        <router-link to="./">back to list</router-link>
      </div>
      <!-- Button to edit document in dashboard -->
      <prismic-edit-button :documentId="documentId"/>

      <h1 class="blog-title">{{ $prismic.richTextAsPlain(fields.title) }}</h1>
      <p class="blog-post-meta"><span class="created-at">{{ Intl.DateTimeFormat('en-US', dateOptions).format(new Date(fields.date)) }}</span></p>

    </div>
      <!-- Slice section template -->
      <section v-for="(slice, index) in slices" :key="'slice-' + index">
        <!-- Text slice template -->
        <template v-if="slice.slice_type === 'text'">
          <text-slice :text="slice.primary.text"/>
        </template>
        <!-- Quote slice template -->
        <template v-else-if="slice.slice_type === 'quote'">
          <quote-slice :quote="slice.primary.quote"/>
        </template>
        <!-- Image with caption slice template -->
        <template v-else-if="slice.slice_type === 'image_with_caption'">
          <image-caption-slice 
            :img="slice.primary.image"
            :size="slice.slice_label"
            :caption="slice.primary.caption"
          />
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
      dateOptions: { year: 'numeric', month: 'short', day: '2-digit' },
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

<style>
.post-part.single a {
  text-decoration: none;
  background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 0.8) 75%);
  background-repeat: repeat-x;
  background-size: 2px 2px;
  background-position: 0 23px;
}
.blog-post-meta {
  color: #9A9A9A;
  font-family: 'Lato', sans-serif;
  margin-bottom: 8px;
}

/* Media Queries */
@media (max-width: 767px) {
  .post-part pre {
    font-size: 14px;
  }
  .blog-post-meta {
    font-size: 16px;
  }
}

@media screen and (min-width: 768px) {
  .blog-post-meta {
    font-size: 16px;
  }
}
</style>