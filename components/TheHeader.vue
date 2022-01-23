<template>
  <div id="header-wrapper" class="center examplex">
    <vs-navbar center-collapsed>
      <template #left>
        <vs-button v-if="isTabletOrLess" flat icon @click="$emit('toggleSidebar')">
          <span class="material-icons"> menu </span>
        </vs-button>
        <h3 v-else>Яндекс.Стырили</h3>
      </template>
      <vs-navbar-item>
        <nuxt-link to="/designer-interfaces">Главная</nuxt-link>
      </vs-navbar-item>
      <template #right>
        <template v-if="!isLoggedIn">
          <vs-button flat @click="dialogActive = true">Войти</vs-button>
          <vs-button>Зарегистрироваться</vs-button>
        </template>
        <template v-else>
          <vs-button flat @click="$auth.logout()">Выйти</vs-button>
          <vs-button disabled>Профиль</vs-button>
        </template>
      </template>
    </vs-navbar>
    <LoginDialog :active.sync="dialogActive" />
  </div>
</template>

<script>
import LoginDialog from '~/components/LoginDialog'

export default {
  components: {
    LoginDialog,
  },
  data() {
    return {
      dialogActive: false,
      isTabletOrLess: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn
    },
  },

  mounted() {
    const matchTablet = window.matchMedia('(max-width: 991.98px)')
    if (matchTablet.matches) {
      this.isTabletOrLess = true
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
