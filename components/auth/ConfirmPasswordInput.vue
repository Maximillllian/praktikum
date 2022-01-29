<template>
  <vs-input
    v-model="$v.copyPasswordConfirm.$model"
    type="password"
    placeholder="Повтори пароль"
    @input="handleInput"
  >
    <template #icon>
      <span class="material-icons">lock</span>
    </template>
    <template
      v-if="!$v.copyPasswordConfirm.sameAs && $v.copyPasswordConfirm.$dirty"
      #message-danger
    >
      Пароли должны совпадать
    </template>
  </vs-input>
</template>

<script>
import { sameAs } from 'vuelidate/lib/validators'

export default {
  props: {
    password: {
      type: String,
      required: true,
      default: '',
    },
    passwordConfirm: {
      type: String,
      required: true,
      default: '',
    },
  },

  validations: {
    copyPasswordConfirm: {
      sameAs: sameAs('password'),
    },
  },

  data() {
    return {
      copyPasswordConfirm: this.passwordConfirm,
    }
  },

  methods: {
    handleInput(value) {
      this.$emit('update:password-confirm', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.material-icons {
  font-size: unset;
}
</style>
