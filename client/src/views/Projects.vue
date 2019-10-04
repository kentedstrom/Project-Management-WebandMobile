<template>
  <div class="projects">

    <h1>

      <button v-on:click="getColor">Print id in console</button>
{{id}}
    </h1>

  </div>
</template>

<script>
import { Api } from '@/Api'
import ProjectItem from '@/components/ProjectItem'

export default {
  name: 'Projects',
  data() {
    return {
      projects: [],
        id: this.$route.params.id
    }
  },
  mounted() {
    this.getProjects()
      window.location.reload()
  },
  methods: {
    getProjects() {
      Api.get('projects')
        .then(reponse => {
          this.projects = reponse.data.projects
        })
        .catch(error => {
          this.projects = []
          console.log(error)
        })
        .then(() => {
          // This code is always executed (after success or error).
        })
    },
    deleteProject(id) {
      Api.delete(`/projects/${id}`)
        .then(response => {
          console.log(response.data.message);
          var index = this.projects.findIndex(project => project._id === id);
          this.projects.splice(index, 1);
        })
        .catch(error => {
          console.log(error)
        })
    },
    createProject() {
      var randomProject = {
        name: this.getRandomColor(),
        //position: this.getRandomInt(10)
      };
      Api.post('/projects', randomProject)
        .then(response => {
          this.projects.push(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max)
    },
    getRandomColor() {
      var colors = ['orange', 'green', 'red', 'blue']
      var index = this.getRandomInt(colors.length)
      return colors[index]
    },
      getColor(){
          console.log(this.$route.params.id);
          this.projectId = this.$route.params.id;
      }
  },
  components: {
    ProjectItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '/../assets/css/stylesheet.css';
  /*
a {
  color: #42b983;
}
.createButton {
  margin-bottom: 1em;
}
.projects {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}*/
</style>
