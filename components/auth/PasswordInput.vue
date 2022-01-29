<template>
  <vs-input v-model="$v.copyPassword.$model" type="password" placeholder="Пароль" @input="handleInput">
    <template #icon>
      <span class="material-icons">lock</span>
    </template>
    <template
      v-if="!$v.copyPassword.required && $v.copyPassword.$dirty"
      #message-danger
    >
      Введи пароль
    </template>
    <template v-else-if="!$v.copyPassword.minLength" #message-danger>
      Пароль должен быть не меньше
      {{ $v.copyPassword.$params.minLength.min }} символов
    </template>
  </vs-input>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  props: {
    password: {
      type: String,
      required: true,
      default: '',
    },
  },

  validations: {
    copyPassword: {
      required,
      minLength: minLength(3),
    },
  },

  data() {
      return {
          copyPassword: this.password
      }
  },

  methods: {
      handleInput(value) {
          this.$emit('update:password', value)
      }
  }
}
</script>

<style lang="scss" scoped>
.material-icons {
  font-size: unset;
}
</style>