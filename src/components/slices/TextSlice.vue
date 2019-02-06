<template>
  <div class='post-part single container'>
    <prismic-rich-text :field="text"/>
  </div>
</template>

<script>
export default {
  props: ['text'],

  name: 'text-slice'
}
</script>