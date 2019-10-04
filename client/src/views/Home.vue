<template>
  <div>
    <b-jumbotron id="jumbo" header="Managizer" lead="Welcome to the Managizer app">
      <p>To start please select a project or create a new one</p>
      <b-button variant="primary" href="/projectcreate">Create Project</b-button>
    </b-jumbotron>
    
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: ''
    }
  },
  mounted() {
    this.getMessage()
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style>

  @import '/../assets/css/stylesheet.css';
  /*
.example-col {
  padding-top: .75rem;
  padding-bottom: .75rem;
  background-color: whitesmoke;
  border: 2px solid lightgray;
}*/
</style>
