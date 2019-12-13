<template>
   <div  class="about">
     <h1>This is the second page</h1>
     <router-link to="/home">Go to Home</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.about {
  text-align: center;
}
h1 {
  margin: 40px auto;
}

a {
  color: #42b983;
}
</style>
