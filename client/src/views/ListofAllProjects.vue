<template>
  <b-form  @reset="onReset">
<div>
  <br>
  <h3>You have {{ projects.length }} projects:</h3>
  <br>
  <b-list-group>
  <router-link v-for="project in projects" :to="{path: '/projects/' + project._id}">
    <project-item :key="project._id" :project="project" @delete-project="deleteProject" >
    </project-item>
  </router-link>
</b-list-group>
<br>
    <h3>
      <router-link to="/projectcreate">Create New Project</router-link>
    </h3>
  <br>
  <button v-on:click="deleteAllProjects">Delete all Projects</button>
</div>
  </b-form>
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
        },
        methods: {
            getProjects() {
                Api.get('projects')
                    .then(response => {
                        this.projects = response.data.projects
                    })
                    .catch(error => {
                        this.projects = [];
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
            deleteAllProjects(){
                Api.delete(`/projects/`)
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
            onReset(evt) {

                evt.preventDefault()
// Reset our form values
                this.form.name = '';
                this.form.description = '';
                this.form.startDate = '';
                this.form.projectedEndDate = '';
// Trick to reset/clear native browser form validation state
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
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
