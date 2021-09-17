<template>
  <div>
  
  
      <router-view></router-view>
  
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
header {
  width: 100%;
  padding: 15px 0;
  margin: 0 ;
  text-align: left;
  background-color: #2ecc71;
}
header .title {
  font-size: 32px;
  padding:0 40px;
  color: white;
}

body {
  display: flex;
  max-width: 1300px;
  height: 100vh;
  margin-left:auto;
  margin-right:auto;
  padding:0 10px;
  text-align: center;

}
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  padding: 10px 0px;
  background-color: #2ecc71;
  color: white;
}
</style>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
    };
  },
  mounted: function() {
   this.isAuthenticated = this.$store.isAuthenticated;
  },
};
</script>


