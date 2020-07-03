<template>
  <div class="outer-container">
    <p>Loading the Prismic's Preview...</p>
  </div>
</template>

<script>
import Vue from 'vue'

/* export default { */
/*   name: 'Preview', */
/*   beforeCreate () { */
/*     const previewToken = this.$route.query.token */

/*     this.$prismic.client.previewSession(previewToken, this.$prismic.linkResolver, '/') */
/*       .then((url) => { */
/*         window.location.replace(url) */
/*       }) */
/*   } */
/* } */
export default {
  name: 'Preview',
  beforeCreate () {
    const { token, documentId } = this.$route.query
    this.$prismic.client.getPreviewResolver(token, documentId).resolve(this.$prismic.linkResolver, '/')
      .then((url) => {
        window.location.replace(url)
      })
  }
}
</script>
