<template>
  <div class="createForm">
    <br>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Name of project" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.projectName"
          required
          placeholder="Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Project description" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.description"
          required
          placeholder="Description"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Start date" label-for="input-2">
        <b-form-input
          id="input-3"
          v-model="form.startDate"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label=" Projected End date" label-for="input-2">
        <b-form-input
          id="input-4"
          v-model="form.projectedEndDate"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

<br>
      <b-button type="submit" variant="primary">Submit</b-button>

      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'ProjectCreate',
  data() {
    return {
      form: {
        projectName: '',
        description: '',
        startDate: '',
        projectedEndDate: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit() {
      const axios = require('axios');
      var formData = new FormData();
      console.log(this.form.projectName);
      formData.append('name',this.form.projectName);
        Api.post('/projects', {
        name: this.form.projectName,
        description: this.form.description,
          startDate: this.form.startDate,
          projectedEndDate: this.form.projectedEndDate

      })

        this.$router.push('/projects')
        window.location.reload()
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
}
}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '/../assets/css/stylesheet.css';
</style>
