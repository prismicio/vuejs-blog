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

<style scoped>
.outer-container {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0;
}
.back {
  color: #9A9A9A;
  display: block;
  max-width: 700px;
  margin: 0 auto 2em auto;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
}
.back:before {
  content: '←';
  display: inline-block;
  position: relative;
  margin-right: 8px;
}
.back a {
  color: #9A9A9A;
}
.back a:hover {
  text-decoration: underline;
}
</style>

