<template>
  <div>
    <br>
    <h3>Staff Member's Information</h3>
    <br>
    <div><h5>Staff Member's Name:  {{staffmemberName}}</h5></div>
    <div><h5>Staff Member's Salary Per Hour:   {{staffSalary}}</h5></div>
    <div><h5>Staff Member's Email:    {{staffEmail}}</h5></div>
  </div>
</template>

<script>
    import { Api } from '@/Api'


    export default {
        name: 'Project',
        data() {
            return {

                staffmemberName: '',
                staffSalary: '',
                staffEmail: '',
                show: true
            }
        },
        mounted() {
            this.getStaffmember();

        },
        methods: {

            getStaffmember() {
                Api.get(`/StaffMembers/${this.$route.params.id}`)
                    .then(response => {
                        console.log(response.data.message);
                        this.staffmemberName = response.data.name
                        this.staffSalary = response.data.salaryPerHour
                        this.staffEmail = response.data.email


                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }







</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '/../assets/css/stylesheet.css';

</style>
