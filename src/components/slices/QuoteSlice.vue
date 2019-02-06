<template>
  <div class='post-part single container'>
    <blockquote>
      <prismic-rich-text :field="quote" class="block-quotation"/>
    </blockquote>
  </div>
</template>

<script>
export default {
  props: ['quote'],

  name: 'quote-slice'
}
</script>