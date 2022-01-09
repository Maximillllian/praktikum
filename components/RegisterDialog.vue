<template>
  <vs-dialog v-model="activeCopy" blur prevent-close @close="handleClosing()">
    <template #header>
      <h4>Ты кто такой? Создай себя сам</h4>
    </template>

    <div class="form">
      <vs-input v-model="$v.form.username.$model" placeholder="Логин">
        <template #icon><span class="material-icons">person</span></template>
        <template
          v-if="!$v.form.username.required && $v.form.username.$dirty"
          #message-danger
        >
          Введи логин
        </template>
        <template v-else-if="!$v.form.username.minLength" #message-danger>
          Логин должен быть не меньше
          {{ $v.form.username.$params.minLength.min }} символов
        </template>
      </vs-input>
      <vs-input
        v-model="$v.form.password.$model"
        type="password"
        placeholder="Пароль"
      >
        <template #icon>
          <span class="material-icons">lock</span>
        </template>
        <template
          v-if="!$v.form.password.required && $v.form.password.$dirty"
          #message-danger
        >
          Введи пароль
        </template>
        <template v-else-if="!$v.form.password.minLength" #message-danger>
          Пароль должен быть не меньше
          {{ $v.form.password.$params.minLength.min }} символов
        </template>
      </vs-input>
      <vs-input
        v-model="$v.form.password_confirm.$model"
        type="password"
        placeholder="Повтори пароль"
      >
        <template #icon>
          <span class="material-icons">lock</span>
        </template>
        <template
          v-if="!$v.form.password_confirm.sameAs && $v.form.password_confirm.$dirty"
          #message-danger
        >
          Пароли должны совпадать
        </template>
      </vs-input>
    </div>

    <template #footer>
      <div class="footer-dialog">
        <vs-button block :disabled="$v.$invalid" @click="register">Зарегистрироваться</vs-button>
      </div>
      <div class="login">
        <small>Есть аккаунт? <nuxt-link to="/login">Войди</nuxt-link></small>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },

  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3),
      },
      password: {
        required,
        minLength: minLength(3),
      },
      password_confirm: {
        sameAs: sameAs('password'),
      },
    },
  },

  data() {
    return {
      form: {
        username: '',
        password: '',
        password_confirm: '',
      },
    }
  },
  computed: {
    activeCopy() {
      return this.active
    },
  },
  methods: {
    async register() {
      try {
        const loginData = {
          username: this.form.username,
          password: this.form.password,
        }
        await this.$axios.$post('api/auth/register/', this.form)
        this.$auth.loginWith('local', { data: loginData })
        this.$router.push('/')
        this.handleClosing()
      } catch (err) {
        const message = err.response.data.username || err.response.data.password || 'Проверьте логин и пароли'
        this.$vs.notification({
          border: 'danger',
          position: 'top-center',
          title: 'Что-то пошло не так',
          text: message,
        })
        console.log(err.message)
        console.log('code', err.response)
      }
    },
    handleClosing() {
      this.$emit('update:active')
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

.login {
  text-align: center;
  font-size: 1rem;

  a {
    color: var(--RoyalBlue);
  }
}
</style>
