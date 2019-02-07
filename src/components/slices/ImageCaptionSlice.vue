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