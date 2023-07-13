<template>
  <span>
    <Badge :text="text" :type="type" vertical="middle" v-if="backend"/>
    <Badge text="Loading..." type="plain" vertical="middle" v-if="!backend"/>
  </span>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      backend: null,
    }
  },
  computed: {
    text: function () {
      // backend.status to lower case
      const status = this.backend.status.toLowerCase()
      // capitalize first letter
      return status.charAt(0).toUpperCase() + status.slice(1)
    },
    type: function () {
      // possible status: UNKNOWN, ONLINE, PAUSED, OFFLINE, RETIRED
      const status = this.backend.status
      if (status === 'RETIRED') {
        return 'error'
      } else if (status === 'UNKNOWN' || status === 'OFFLINE' || status === 'PAUSED') {
        return 'warning'
      }
      return 'tip'
    }
  },
  mounted() {
    fetch(`http://34.90.225.20.nip.io/qiskit/backends?name=${this.id}`)
        .then(response => response.json())
        .then(data => this.backend = data[0])
  }
}
</script>

<style>
.badge.plain {
  background-color: #9E9E9E !important;
  color: #f5f5f5 !important;
}
</style>
