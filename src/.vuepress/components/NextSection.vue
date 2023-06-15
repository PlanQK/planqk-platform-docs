<template>
  <div class="container">
    <a v-for="item in items" class="card" :href="item.link">
     <span v-if="!item.fontawesome"
           class="material-symbols-outlined" :style="{'color': item.color}">{{ item.icon }}</span>
      <i v-if="item.fontawesome"
         :class="item.icon" :style="{'color': item.color}"></i>
      <h3 class="title">{{ item.title }}</h3>
      <span class="description">{{ item.description }}</span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Get Started with our SDK',
          description: 'Learn how to use our SDK to interact with our supported quantum backends',
          icon: 'code',
          color: 'blue',
          link: '/docs/getting-started/using-sdk.html'
        },
        {
          title: 'Deep Dive into Jobs',
          description: 'Learn everything about Jobs and how to use them',
          icon: 'play_arrow',
          color: 'red',
          link: '/docs/service-platform/managed-services-jobs.html'
        },
        {
          title: 'Custom Docker Images',
          description: 'Run your own Docker images on the platform',
          icon: 'fa-brands fa-docker',
          fontawesome: true,
          color: 'green',
          link: '/docs/service-platform/managed-services-custom-container.html#runtime-interface'
        },
        {
          title: 'Explore our Tutorials',
          description: 'Check out our tutorials to get started with the platform',
          icon: 'school',
          color: 'orange',
          link: '/tutorials/'
        }
      ]
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  column-gap: 1rem;
  align-items: stretch;
  text-align: left;
  margin-top: 2rem;
}

.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 0.75rem;
  border-width: 1px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  text-align: left;
  color: #2c3e50;
  cursor: pointer;
  text-decoration: none !important;
}

/* Styles for screens smaller than 600px */
@media (max-width: 600px) {
  .container {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

.description {
  font-size: 1rem;
  color: #7f8c8d;
}

.title {
  font-size: 1.2rem;
  color: #2c3e50;
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0,
  'wght' 700,
  'GRAD' 0,
  'opsz' 48
}
</style>
