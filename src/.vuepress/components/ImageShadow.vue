<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <img :src="src" alt="Add environment variables">
</template>

<style scoped>

img {
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>