<template>
  <div>
    <template v-if="size === 'image-full-width'">
      <div class='blog-header single' :style="{ 'background-image': 'url(' + img.url + ')'}">
        <template v-if="$prismic.richTextAsPlain(caption) != ''">
          <div class="wrapper">
            <h1>{{ $prismic.richTextAsPlain(caption) }}</h1>
          </div>
        </template>
      </div>
    </template>
    <template v-else>
      <div class='post-part single container'>
        <p class="block-img" :class="size">
          <prismic-image :field="img"/>
        </p>
        <template v-if="$prismic.richTextAsPlain(caption) != ''">
          <p>
            <span class="image-label">{{ $prismic.richTextAsPlain(caption) }}</span>
          </p>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: ['img','caption','size'],
  name: 'image-caption-slice'
}
</script>

<style scoped>
.blog-header {
  height: 85px;
  position: relative;
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  background-color: white;
  background-size: cover;
  color: white;
  margin-bottom: 3rem;
}
.blog-header.single::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
}
.blog-header.single::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: -moz-linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0) 1%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,0.2) 100%);
  background: -webkit-linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0) 1%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,0.2) 100%);
  background: -o-linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0) 1%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,0.2) 100%);
  background: -ms-linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0) 1%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0.1) 90%, rgba(0,0,0,0.2) 100%);
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0) 1%, rgba(0,0,0,0.05) 80%, rgba(0,0,0,0.1) 90%, rgba(0, 0, 0, 0.2) 100%);
}
.blog-header.single, .blog-header.home {
  height: 400px;
}
.blog-header .wrapper {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
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
.post-part.single .block-img {
  margin-bottom: 24px;
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
  .blog-header {
    padding: 5px;
  }
  .blog-header .wrapper {
    width: 80%;
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
