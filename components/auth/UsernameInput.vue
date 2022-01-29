<template>
  <vs-input v-model="copyUsername" placeholder="Логин" @input="handleInput">
    <template #icon><span class="material-icons">person</span></template>
    <template
      v-if="!$v.copyUsername.required && $v.copyUsername.$dirty"
      #message-danger
    >
      Введи логин
    </template>
    <template v-else-if="!$v.copyUsername.minLength" #message-danger>
      Логин должен быть не меньше
      {{ $v.copyUsername.$params.minLength.min }} символов
    </template>
  </vs-input>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  props: {
    username: {
        type: String,
        required: true,
        default: ''
    }
  },

  validations: {
    copyUsername: {
      required,
      minLength: minLength(3),
    },
  },

  data() {
      return {
          copyUsername: this.username
      }
  },

  methods: {
      handleInput(value) {
          this.$emit('update:username', value)
      }
  }
}
</script>

<style lang="scss" scoped>
.material-icons {
  font-size: unset;
}
</style>