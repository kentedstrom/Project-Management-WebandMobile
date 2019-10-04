<template>
  <div class="createForm">
    <br>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="input-group-1" label="Name of task" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.taskName"
          required
          placeholder="Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Task description" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.description"
          required
          placeholder="Description"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Due date" label-for="input-2">
        <b-form-input
          id="input-3"
          v-model="form.dueDate"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

      <br>
      <b-button type="submit" variant="primary">Submit
      </b-button>
    </b-form>
    <br>
    <router-link :to="{ name: 'tasksList', params: {id: this.id} }">Go back to tasks</router-link>

  </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'TasksCreate',
  data() {
    return {
        tasks: [],
        id: this.$route.params.id,
        form: {
            taskName: '',
            description: '',
            dueDate: ''
        },
        show: true
    }
  },
  mounted() {

  },
  methods: {
      onSubmit() {
          const axios = require('axios');
          var formData = new FormData();
          console.log(this.form.taskName);
          formData.append('name',this.form.taskName);
          Api.post('projects/' + this.id + '/tasks', {
              name: this.form.taskName,
              description: this.form.description,
              dueDate: this.form.dueDate,
              completed: false
          })
      }

  },
    created(){

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
}
</style>
