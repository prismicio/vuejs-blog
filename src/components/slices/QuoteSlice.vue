<template>
  <div class='post-part single container'>
    <blockquote class="block-quotation">{{ $prismic.richTextAsPlain(quote) }}</blockquote>
  </div>
</template>

<script>
export default {
  props: ['quote'],

  name: 'quote-slice'
}
</script>

<style scoped>
.post-part.single .image-full-width + .image-label {
  width: 100%;
}
.post-part.single .block-quotation {
  margin-bottom: 2rem;
  display: inline-block;
  font-style: italic;
  font-size: 24px;
}
.post-part.single .block-quotation:before { content: "« " }
.post-part.single .block-quotation:after { content: " »" }
.post-part.single .block-citation {
  display: inline-block;
  font-style: italic;
  border-left: solid #B4B4B4 4px;
  padding-left: 10px;
}

@media screen and (min-width: 768px) {
  /* Blog post images */
  .post-part.single .block-quotation ,  .blog-main.single .block-quotation {
    width: 130%;
    margin: 0 -15% 2rem -15%;
    font-size: 30px;
    padding: 0;
  }
  .post-part.single .block-citation, .blog-main.single .block-citation {
    margin: 20px 0;
  }
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
</style>
