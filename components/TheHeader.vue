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
          <vs-button flat to="/login">Войти</vs-button>
          <vs-button>Зарегистрироваться</vs-button>
        </template>
        <template v-else>
          <vs-button flat :loading="buttonLoading" @click="$auth.logout()">Выйти</vs-button>
          <vs-button disabled>Профиль</vs-button>
        </template>
      </template>
    </vs-navbar>
  </div>
</template>

<script>

export default {
  data() {
    return {
      dialogActive: false,
      isTabletOrLess: false,
      buttonLoading: false
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
  },

  methods: {
    async logout() {
      this.buttonLoading = true
      try {
        await this.$auth.logout()
      } catch (err) {
        throw new Error(err)
      } finally {
        this.buttonLoading = false
      }
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
