<template>
  <div class='post-part single container'>
    <prismic-image :field="img" class="block-img"/>
    <prismic-rich-text :field="caption" class="image-label"/>
  </div>
</template>

<script>
export default {
  props: ['img', 'caption'],

  name: 'image-caption-slice'
}
</script>