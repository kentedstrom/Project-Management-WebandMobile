<template>

   <div id="dropDownMenu">
   <b-form-select id="b-form-select" v-model="selectedValue">
     <option v-for="project in projects"
             :value="project._id"
     >
       {{project.name}}
     </option>

   </b-form-select>

     <p v-if="selectedValue">
       <router-link v-on:click.native="notifyNavbar" :to="{ name: 'project', params: { id: selectedValue } }">Go to Project</router-link>
     </p>
     <p v-else>Pick a project</p>

 </div>

   </template>

   <script>
     import { Api } from '@/Api'

   export default {
     name: 'Projects',
     data() {
       return {
         selectedValue: null,
         projects: []
       }
     },
       props: ['project._id'],
     methods: {
       notifyNavbar : function(event){
           this.$emit('updatedId', this.selectedValue)
           console.log("In DropdownMenu. SelectedValue: " + this.selectedValue);
       },
       goToProject : function(){
         console.log(this.selectedValue);
       },
         getSelectedProject: function(){
           if (this.selectedValue == null){
               return "No project has yet been chosen"
           }else{
               return this.selectedValue;
           }
         }

     },
     created() {
          Api.get('projects')
           .then(response => {
             this.projects = response.data.projects;
             console.log(this.projects);
           })
           .catch(error => {
             this.projects = [];
             console.log(error);
           })
           .then(() => {
             // This code is always executed (after success or error).
           })

     }
   }
   </script>

   <style scoped>

    @import '/../assets/css/stylesheet.css';
   </style>
