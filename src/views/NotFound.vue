<template>
  <div class="main">
    <div class="outer-container">
      <div class="back">
        <router-link to="./">back to list</router-link>
      </div>

      <h1>Page not found</h1>
      <p>Sorry we were unable to find the page you are looking for.</p>
      <router-link to="/blog" style="text-decoration: underline;">Return to home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>