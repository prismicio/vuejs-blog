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