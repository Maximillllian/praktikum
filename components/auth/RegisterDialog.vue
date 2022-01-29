<template>
  <vs-dialog v-model="active" blur prevent-close>
    <template #header>
      <h4>Ты кто такой? Создай себя сам</h4>
    </template>

    <div class="form">
      <username-input :username.sync="username" />
      <password-input :password.sync="password" />
      <confirm-password-input :password="password" :password-confirm.sync="password_confirm" />
    </div>

    <template #footer>
      <div class="footer-dialog">
        <vs-button block :loading="buttonLoading" @click="register">Зарегистрироваться</vs-button>
      </div>
      <div class="login">
        <small>Есть аккаунт? <nuxt-link to="/login">Войди</nuxt-link></small>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import UsernameInput from '~/components/auth/UsernameInput'
import PasswordInput from '~/components/auth/PasswordInput'
import ConfirmPasswordInput from '~/components/auth/ConfirmPasswordInput'

export default {
  components: {
    UsernameInput,
    PasswordInput,
    ConfirmPasswordInput
  },


  data() {
    return {
      username: '',
      password: '',
      password_confirm: '',
      buttonLoading: false,
      active: true
    }
  },

  mounted() {
    document.querySelector('.vs-dialog__close').remove()
  },

  methods: {
    async register() {
      try {
        this.buttonLoading = true
        const loginData = {
          username: this.username,
          password: this.password,
        }
        await this.$axios.$post('auth/register/', { username: this.username, password:this.password, password_confirm: this.password_confirm })
        this.$auth.loginWith('local', { data: loginData })
        this.$router.push('/')
      } catch (err) {
        const message = err.response.data.username || err.response.data.password || 'Проверьте логин и пароли'
        this.$vs.notification({
          border: 'danger',
          position: 'top-center',
          title: 'Что-то пошло не так',
          text: message,
        })
      } finally {
        this.buttonLoading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
h4 {
  margin: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.vs-input-parent {
  width: 100%;
}

.form::v-deep input {
  width: 100%;
}

button {
  margin: 1rem 0;
}

.login {
  text-align: center;
  font-size: 1rem;

  a {
    color: var(--RoyalBlue);
  }
}
</style>
