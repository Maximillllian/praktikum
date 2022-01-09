<template>
  <vs-dialog v-model="activeCopy" blur prevent-close @close="handleClosing()">
    <template #header>
      <h4>Ты кто такой? Назови пароль</h4>
    </template>

    <div class="form">
      <vs-input v-model="$v.username.$model" placeholder="Логин">
        <template #icon><span class="material-icons">person</span></template>
        <template v-if="(!$v.username.required) && $v.username.$dirty" #message-danger>
          Введи логин
        </template>
        <template v-else-if="!$v.username.minLength" #message-danger>
          Логин должен быть не меньше {{$v.username.$params.minLength.min}} символов
        </template>
      </vs-input>
      <vs-input v-model="$v.password.$model" type="password" placeholder="Пароль">
        <template #icon>
          <span class="material-icons">lock</span>
        </template>
        <template v-if="(!$v.password.required) && $v.password.$dirty" #message-danger>
          Введи пароль
        </template>
        <template v-else-if="!$v.password.minLength" #message-danger>
          Пароль должен быть не меньше {{$v.password.$params.minLength.min}} символов
        </template>
      </vs-input>
    </div>

    <template #footer>
      <div class="footer-dialog">
        <vs-button block :disabled="$v.$invalid" @click="login">Войти</vs-button>

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
import { mapActions } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

// import Vue from 'vue';
// import Vuelidate from 'vuelidate';
// Vue.use(Vuelidate)

export default {
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },

  validations: {
    username: {
      required,
      minLength: minLength(3),
    },
    password: {
      required,
      minLength: minLength(3),
    },
  },

  data() {
    return {
      username: '',
      password: '',
    }
  },

  computed: {
    activeCopy() {
      return this.active
    },
  },
  methods: {
    ...mapActions('errors', ['showErrorNotification']),
    async login() {
      try {
        const loginData = {
          username: this.username,
          password: this.password,
        }
        await this.$auth.loginWith('local', {
          data: loginData,
        })
        this.$router.push('/')
        this.handleClosing()
      } catch (err) {
        this.$vs.notification({
          border: 'danger',
          position: 'top-center',
          title: 'Ошибка авторизации',
          text: 'Неправильный логин или пароль',
        })
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

.register {
  text-align: center;
  font-size: 1rem;

  a {
    color: var(--RoyalBlue);
  }
}
</style>
