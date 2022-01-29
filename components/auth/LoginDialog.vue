<template>
  <vs-dialog v-model="active" blur prevent-close>
    <template #header>
      <h4>Ты кто такой? Назови пароль</h4>
    </template>

    <div class="form">
      <username-input :username.sync="username" />
      <password-input :password.sync="password" />
    </div>

    <template #footer>
      <div class="footer-dialog">
        <vs-button block :loading="buttonLoading" @click="login"
          >Войти</vs-button
        >

        <div class="register">
          <small
            >Нет аккаунта?
            <nuxt-link to="/register">Зарегистрируйся</nuxt-link></small
          >
        </div>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import UsernameInput from '~/components/auth/UsernameInput'
import PasswordInput from '~/components/auth/PasswordInput'

export default {
  components: {
    UsernameInput,
    PasswordInput,
  },

  data() {
    return {
      username: '',
      password: '',
      buttonLoading: false,
      active: true,
    }
  },

  mounted() {
    document.querySelector('.vs-dialog__close').remove()
  },

  methods: {
    async login() {
      try {
        this.buttonLoading = true
        const loginData = {
          username: this.username,
          password: this.password,
        }
        await this.$auth.loginWith('local', {
          data: loginData,
        })
        this.$router.push('/')
      } catch (err) {
        this.$vs.notification({
          border: 'danger',
          position: 'top-center',
          title: 'Ошибка авторизации',
          text: 'Неправильный логин или пароль',
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

.material-icons {
  font-size: unset;
}

.register {
  text-align: center;
  font-size: 1rem;

  a {
    color: var(--RoyalBlue);
  }
}
</style>
