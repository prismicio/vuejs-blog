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
          :caption="slice.primary.caption" 
          :class="slice.slice_label">
          </image-caption-slice>
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