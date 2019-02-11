<template>
  <div class='post-part single container'>
    <p class="block-img" :class="size">
      <prismic-image :field="img"/>
    </p>
    <blockquote class="image-label">{{ $prismic.richTextAsPlain(caption) }}</blockquote>
  </div>
</template>

<script>
export default {
  props: ['img','caption','size'],
  name: 'image-caption-slice'
}
</script>

<style scoped>
.post-part.single .image-full-width + .image-label {
  width: 100%;
}
.post-part.single img, .blog-main.single img {
  width: 100%;
  height: auto;
}
.post-part.single .image-full-width + .image-label, .blog-main.single .image-full-width + .image-label {
  width: 100%;
}
.post-part.single .image-label {
  display: block;
  text-align: center;
  font-style: italic;
  font-size: 14px;
  color: #949494;
}
.image-label .block-quotation {
  margin-bottom: 2rem;
  display: inline-block;
  font-style: italic;
  font-size: 24px;
}
.post-part li {
  list-style-type: initial;
  margin-left: 1em;
}
/* Media Queries */
@media (max-width: 767px) {
  .container {
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
}
@media screen and (min-width: 768px) {
  /* Blog post images */
  .block-img.emphasized {
    width: 130%;
    margin: 0 -15% 2rem -15%;
  }
}
/* vh vw fallback for ios7 */
@media all and (device-width: 768px) and (device-height: 1024px) and (orientation:portrait) {
  .main .post-part.single .image-full-width {
    width: 768px;
  }
}

@media all and (device-width: 768px) and (device-height: 1024px) and (orientation:landscape){
  .main .post-part.single .image-full-width {
    width: 768px;
  }
}

@media screen and (device-aspect-ratio: 40/71) {
  .main .post-part.single .image-full-width {
    width: 530px;
  }
}
</style>
