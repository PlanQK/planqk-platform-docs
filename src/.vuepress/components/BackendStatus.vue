<template>
  <div>
    <VueCustomTooltip v-if="backend" :label="tooltipText">
      <Badge  :text="text" :type="type" vertical="middle"/>
    </VueCustomTooltip>
    <Badge v-else text="Loading..." type="plain" vertical="middle"/>
  </div>
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
      if (status === 'RETIRED' || status === 'OFFLINE' ) {
        return 'error'
      } else if (status === 'UNKNOWN' || status === 'PAUSED') {
        return 'warning'
      }
      return 'tip'
    },
    tooltipText: function () {
      const status = this.backend.status
      if (status === 'ONLINE' ) {
        return 'Jobs can be submitted and will be executed'
      } else if (status === 'PAUSED') {
        return 'Jobs can be submitted and will be executed once the backend is online again'
      } else if (status === 'OFFLINE') {
        return 'Jobs cannot be submitted';
      } else if (status === 'RETIRED') {
        return 'Backend is retired and cannot be used anymore'
      } else if (status === 'UNKNOWN') {
        return 'Backend status is unknown'
      }
    }
  },
  mounted() {
    fetch(`https://platform.planqk.de/qiskit/backends?name=${this.id}`)
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

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 350px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 20%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
</style>
