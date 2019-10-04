<template>
  <b-form  @reset="onReset">
<div>
  <br>
  <h3>Company has {{ staffMembers.length }} staff members:</h3>
  <br>
  <b-list-group>
    <router-link v-for="staffMember in staffMembers" :to="{path: '/staffMembers/' + staffMember._id}">
    <staffMember-item :key="staffMember._id" :staffMember="staffMember" @delete-staffMember="deleteStaffMember" >
    </staffMember-item>
    </router-link>
  </b-list-group>
<br>
    <h5>
      <router-link to="/StaffMembersCreate">Create New Staff Member</router-link>
    </h5>
  <br>
  <button v-on:click="deleteAllStaffMembers">Delete all Staff Members</button>
</div>
  </b-form>
</template>

<script>
    import { Api } from '@/Api'
    import StaffMemberItem from '@/components/StaffMemberItem'

    export default {
        name: 'StaffMembers',
        data() {
            return {
                staffMembers: [],
                id: this.$route.params.id
            }
        },
        mounted() {
            this.getStaffMembers()
        },
        methods: {
            getStaffMembers() {
                Api.get('staffMembers')
                    .then(response => {
                        this.staffMembers = response.data.staffMembers
                    })
                    .catch(error => {
                        this.staffMembers = [];
                        console.log(error)
                    })
                    .then(() => {
                        // This code is always executed (after success or error).
                    })
            },
            deleteStaffMember(id) {
                Api.delete(`/staffMembers/${id}`)
                    .then(response => {
                        console.log(response.data.message);
                        var index = this.staffMembers.findIndex(staffMember => staffMember._id === id);
                        this.staffMembers.splice(index, 1);
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            deleteAllStaffMembers(){
                Api.delete(`/staffMembers/`)
                    .then(response => {
                        console.log(response.data.message);
                        var index = this.staffMembers.findIndex(staffMember => staffMember._id === id);
                        this.staffMembers.splice(index, 1);
            })
                    .catch(error => {
                        console.log(error)
                    })
            },
            createStaffMember() {
                var randomStaffMember = {
                    name: this.getRandomColor(),
                    //position: this.getRandomInt(10)
                };
                Api.post('/staffMembers', randomStaffMember)
                    .then(response => {
                        this.staffMembers.push(response.data)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            onReset(evt) {

                evt.preventDefault();
// Reset our form values
                this.form.name = '';
                this.form.description = '';
                this.form.startDate = '';
                this.form.staffMemberedEndDate = '';
// Trick to reset/clear native browser form validation state
                this.show = false;
                this.$nextTick(() => {
                    this.show = true
                })
            },
        },
      components: {
        StaffMemberItem
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
.staffMembers {
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2em;
}*/
</style>
