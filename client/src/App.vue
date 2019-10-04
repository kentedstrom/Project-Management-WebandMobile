<template>
  <div id="app">
    <NavBar></NavBar>

    <router-view/>
  </div>
</template>

<style>
  @import 'assets/css/stylesheet.css';
  /*
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
  background-color: #F78733;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
}*/


/* Page content. The value of the margin-left property should match the value of the sidebar's width property */
  /*
div.content {
  padding: 1px 16px;
  height: 1000px;
}*/


</style>

<script>

    import DropdownMenu from './components/DropdownMenu'
    import NavBar from './components/NavBar'
    export default {
        name: 'app',
        components: {
            'DropdownMenu': DropdownMenu,
            'NavBar': NavBar
        }
    }


</script>
