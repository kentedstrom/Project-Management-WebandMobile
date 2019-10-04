<template>
  <b-list-group-item>

    <i>Set task as completed</i>
    <b-button type="button" class="close" @click="$emit('completeTask', task._id)">&times;</b-button>
  </b-list-group-item>
</template>

<script>

export default {
  name: 'task-item',
  props: ['task']
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
