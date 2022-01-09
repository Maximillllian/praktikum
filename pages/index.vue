<template>
  <div>
    <h1>Привет, меня зовут Макс</h1>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      active: 'home',
    }
  },
  created() {
    this.$router.push('/designer-interfaces')
  },
}
</script>

<style lang="scss" scoped>
.long {
}
</style>
