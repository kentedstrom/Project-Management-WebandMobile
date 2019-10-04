<template>
    <div>

      <b-list-group>
        <b-list-group-item>
          <br>
          <h3>Project: {{projectName}}</h3>
          <h5>Description:{{description}}</h5>
          <h5>Start Date:  {{startDate}} </h5>
          <h5>Projected End Date: {{projectedEndDate}} </h5>
          <h5>Number of tasks: </h5>
        </b-list-group-item>

      </b-list-group>


<br>
      <button v-on:click="deleteProject">Delete Project</button>

    </div>
</template>

<script>
    import { Api } from '@/Api'


    export default {
        name: 'Project',
        data() {
            return {

                    projectName: '',
                    description: '',
                    startDate: '',
                    projectedEndDate: '',
                    projectTasks: [ ],
                    taskName: '',
                    taskDueDate: '',
                    taskDescription: '',
                    taskCompletetion: '',
                show: true
            }
        },
        mounted() {
            this.getProjects();

        },
        methods: {


            getProjects() {
                      Api.get(`/projects/${this.$route.params.id}`)
                             .then(response => {
                                 console.log(response.data.message);
                                 this.projectName = response.data.name
                                  this.description = response.data.description
                                 this.startDate = response.data.startDate
                                 this.projectedEndDate = response.data.projectedEndDate
                                 this.projectTasks = response.data.tasks
                                 this.getTasks()

                             })
                             .catch(error => {
                                 console.log(error)
                             })
            },

            getTasks() {
                Api.get(`/projects/${this.$route.params.id}/tasks/` + this.projectTasks[0])
                    .then(response => {
                        console.log(JSON.stringify(this.projectTasks[0]));
                        this.taskName = response.data.name
                        this.taskDescription = response.data.description
                        this.taskDueDate = response.data.dueDate
                        this.taskCompletetion = response.data.completed

                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            deleteProject(id) {
                Api.delete(`/projects/${this.$route.params.id}`)
                    .then(response => {
                        console.log(response.data.message);
                        var index = this.projects.findIndex(project => project.id === id);
                        this.projects.splice(index, 1);


                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.$router.push('/projects');
                window.location.reload()
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

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '/../assets/css/stylesheet.css';

</style>
