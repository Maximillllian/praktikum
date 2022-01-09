<template>
  <div id="header-wrapper" class="center examplex">
    <vs-navbar center-collapsed>
      <template #left>
        <h3>Яндекс.Стырили</h3>
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
      dialogActive: false
    }
  },
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn;
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
