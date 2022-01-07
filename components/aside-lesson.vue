<template>
  <vs-sidebar v-model="active" relative hover-expand reduce open>
    <template #logo> Тема: {{ currentTheme.title }} </template>
    <vs-sidebar-item
      v-for="lesson in currentLessons"
      :id="lesson.slug"
      :key="lesson.slug"
      :to="`./${lesson.slug}`"
    >
      {{ lesson.title }}
    </vs-sidebar-item>
    <vs-button border :to="`/${courseName}`">К курсам</vs-button>
    <vs-button v-if="!isLastTheme" :to="nextThemePath"
      >Следующая тема</vs-button
    >
  </vs-sidebar>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      active: '',
    }
  },
  computed: {
    ...mapState('courses', [
      'courseName',
      'currentTheme',
      'currentLessons',
      'currentLesson',
    ]),
    ...mapGetters('courses', ['isLastTheme', 'nextThemePath']),
  },
  mounted() {
    this.active = this.currentLesson.slug
  },
  methods: {
    ...mapActions('courses', ['getCurrentLesson']),
  },
}
</script>

<style lang="scss">
aside .reduce {
  .vs-sidebar__logo {
    color: transparent !important;
    // display: none;
  }

  .vs-button {
      display: none;
  }
}

.vs-sidebar-content {
  height: calc(100vh - 90px) !important;
}
</style>
