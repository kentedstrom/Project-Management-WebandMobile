<template>
  <div class="projects">
    <h3>You have {{ projects.length }} projects:</h3>
    <br>
    <b-button type="button" class="createButton" @click="createProject()">Create Project</b-button>
    <br>
    <b-list-group>
      <project-item v-for="project in projects" :key="project._id" :project="project" @delete-project="deleteProject"></project-item>
    </b-list-group>
  </div>
</template>

<script>
import { Api } from '@/Api'
import ProjectItem from '@/components/ProjectItem'

export default {
  name: 'Projects',
  data() {
    return {
      projects: []
    }
  },
  mounted() {
    this.getProjects()
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
