<template>
  <div id="createProjectForm">
    <br>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="Name of Staff Member" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="hourly salary" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.hourlySalary"
          required
          placeholder="Hourly Salary"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="E-mail" label-for="input-2">
        <b-form-input
          id="input-3"
          v-model="form.email"
          type="email"
          required
          placeholder="email"
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
    name: 'StaffMembersCreate',
    data() {
      return {
        form: {
          name: '',
          hourlySalary: '',
          email: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit() {
        const axios = require('axios');
        var formData = new FormData();
        console.log(this.form.name);
        formData.append('name',this.form.name);
        Api.post('http://localhost:3000/api/staffmembers', {
          name: this.form.name,
          hourlySalary: this.form.hourlySalary,
          email: this.form.email
        });

        this.$router.push('/staffmembers');
        window.location.reload()
      },

      onReset(evt) {

        evt.preventDefault();
// Reset our form values
        this.form.name = '';
        this.form.hourlySalary = '';
        this.form.email = '';
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
