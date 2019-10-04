<template>
  <b-list-group-item :style="{ color: staffMember.name }">

    {{ staffMember.name }} <!--is at position {{ camel.position }}-->
    <b-button type="button" class="close" @click="$emit('delete-staffMember', staffMember._id)">&times;</b-button>
  </b-list-group-item>
</template>

<script>

export default {
  name: 'staffMember-item',
  props: ['staffMember']
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
