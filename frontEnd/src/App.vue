<template>
  <div id="app">
    <div class="title">
      <h1 class="title-text">Data Specifier</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin: 0; */
  /* margin-top: 60px; */
}
.title {
  height: 60px;
  background: #202c38;
  font-size: 20px;
  color: aliceblue;
  text-align: left;
  padding-top: 1px;
  padding-left: 40px;
  margin-bottom: 10px;
}
.title-text {
  margin-top: 4px;
}
</style>
