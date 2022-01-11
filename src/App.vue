<template>
  <div id="app">
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
  color: #2c3e50;
  background-color: #efeff4;
  height: 100vh;
  font-size: 15px;
}
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
</style>
