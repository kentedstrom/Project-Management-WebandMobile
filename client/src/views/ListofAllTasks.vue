<template>

<div>

<br>

  <h5>
    <router-link :to="{ name: 'tasksCreate', params: { id: id } }">Create New Task</router-link>
  </h5>


<br>
  <b-list-group>
    <b>Completed tasks:</b>
    <p id="all tasks" v-for="task in tasksList" v-if="task.completed">

      <b-list-group-item v-model="tasksList">
        Name: {{ task.name }} <br>
        Description: {{task.description}} <br>
        Duedate: {{task.dueDate}} <br>

      </b-list-group-item>
    </p>
  </b-list-group>
<br>


      <b-list-group>
        <strong>Unfinished tasks:</strong>
        <p id="all tasks" v-for="task in tasksList" v-if="!task.completed">

        <b-list-group-item v-model="tasksList">
     Name: {{ task.name }} <br>
     Description: {{task.description}} <br>
     Duedate: {{task.dueDate}} <br>

          <task-item :key="task._id" :task="task" @completeTask="completeTask">
          </task-item>

        </b-list-group-item>
        </p>
  </b-list-group>





</div>
</template>

<script>
    import { Api } from '@/Api'
    import TaskItem from '@/components/TaskItem'

    export default {
        name: 'Projects',
        data() {
            return {
                projectTasks: [],
                tasksList: [],
                id: this.$route.params.id
            }
        },
        mounted() {
            this.getProjects()
        },
        methods: {
            getProjects() {
                Api.get(`/projects/` + this.id)
                    .then(response => {
                        this.projectTasks = response.data.tasks;
                        this.getTasks()

                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            getTasks() {

                for (let i = 0; i < this.projectTasks.length; i++) {

                    Api.get(`/projects/${this.$route.params.id}/tasks/` + this.projectTasks[i])
                        .then(response => {
                            this.tasksList.push(response.data); //pushing all data about all projects into the array
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }

            },
            completeTask(id) {
                console.log(id);
                const axios = require('axios');
                //var formData = new FormData();
                //console.log(this.form.taskName);
                //formData.append('name',this.form.taskName);
                Api.patch('tasks/' + id, {
                    completed: true
                })
                    .then((response) => {
                        console.log(response);
                    }, (error) => {
                        console.log(error);
                    });
                this.tasksList = [] //A workaround to display the new list
                this.getProjects();
            }
        },
        components: {
            TaskItem
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '/../assets/css/stylesheet.css';
</style>
