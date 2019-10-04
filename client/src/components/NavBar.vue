

<template>

  <div id="navbar">

    <b-navbar toggleable="lg" type="dark" variant="info">

      <b-navbar-brand id="managizer-button" href="#"><router-link to="/">Managizer</router-link></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">
            <p v-if="selectedProject">
              <router-link :to="{ name: 'tasksList', params: {id: this.selectedProject} }">Tasks</router-link>
            </p>
            <p v-else>Tasks</p>


          </b-nav-item>

          <b-nav-item href="#">
            <router-link :to="{ name: 'StaffMembers' }">StaffMembers</router-link>
       </b-nav-item>

          <b-nav-item href="#">
            <router-link to="/projects">Projects</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <DropdownMenu id="nav-drop-down" :project._id="selectedProject" @updatedId="selectedProject = $event">

            </DropdownMenu>
          </b-nav-form>


        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

   <script>
       import DropdownMenu from './DropdownMenu'
       export default {
           name: 'NavBar',
           components: {
               'DropdownMenu': DropdownMenu
           },
           data() {
               return {
                   selectedProject: this.$route.params.id
               }
           }


       }


   </script>

   <style scoped>


   </style>
