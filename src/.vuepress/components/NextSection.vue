<template>
  <div>
    <h2 style="margin-top: 3rem;">Whats Next?</h2>
    <div class="container">
      <a v-for="item in items" class="card" :href="item.link">
        <span class="material-symbols-outlined" :style="{'color': item.color}">{{item.icon}}</span>
        <h3 class="title">{{ item.title }}</h3>
        <span class="description">{{ item.description }}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Invite your Team',
          description: 'Create an organization to collaborate with your team',
          icon: 'groups',
          color: 'blue',
          link: '/docs/getting-started/manage-organizations.html'
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
          icon: 'code',
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