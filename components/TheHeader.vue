<template>
    <div id="header-wrapper" class="center examplex">
      <vs-navbar v-model="active" center-collapsed>
        <template #left>
          <h3>Яндекс.Стырили</h3>
        </template>
        <vs-navbar-item>
          <nuxt-link to="/designer-interfaces">Главная</nuxt-link>
        </vs-navbar-item>
        <template #right>
          <vs-button flat disabled>Login</vs-button>
          <vs-button disabled>Get Started</vs-button>
        </template>
      </vs-navbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: false
        }
    }
}
</script>

<style lang="scss" scoped>
.vs-navbar-content {
    position: fixed !important;
}

#header-wrapper {
  margin-bottom: 80px;
}
</style>