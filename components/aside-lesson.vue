<template>
  <vs-sidebar v-model="active" relative hover-expand reduce open>
    <vs-sidebar-item
      v-for="lesson in currentLessons"
      :id="lesson.slug"
      :key="lesson.slug"
      :to="`./${lesson.slug}`"
    >
      {{ lesson.title }}
    </vs-sidebar-item>
  </vs-sidebar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      active: '',
    }
  },
  computed: {
    ...mapState('courses', ['currentLessons', 'currentLesson']),
  },
  mounted() {
    this.active = this.currentLesson.slug
  },
  methods: {
    ...mapActions('courses', ['getCurrentLesson']),
  },
}
</script>

<style lang="scss" scoped>
.vs-sidebar-content {
  height: calc(100vh - 90px) !important;
}
</style>
