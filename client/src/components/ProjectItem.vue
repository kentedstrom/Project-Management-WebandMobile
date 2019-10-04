<template>
  <b-list-group-item :style="{ color: project.name }">

    {{ project.name }} <!--is at position {{ camel.position }}-->
    <b-button type="button" class="close" @click="$emit('delete-project', project._id)">&times;</b-button>
  </b-list-group-item>
</template>

<script>

export default {
  name: 'project-item',
  props: ['project']
}
</script>

<style scoped>

  @import '/../assets/css/stylesheet.css';
  /*
img {
  width: 33px;
  margin-right: 10px;
}*/
</style>
