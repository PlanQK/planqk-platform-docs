<template>
  <div class="video-container">
    <iframe :src="url + '?hide_owner=true&hide_title=true&hideEmbedTopBar=true&hide_share=true'"
            frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen/>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.video-container {
  position: relative;
  border-radius: 10px;
  padding-bottom: 58.727569331158236%;
  height: 0;
}

.video-container iframe {
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
