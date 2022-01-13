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
    <vs-button v-if="!isLastTheme" :to="`/${courseName}/lesson/${nextThemeFirstLessonSlug}`"
      >Следующая тема</vs-button
    >
  </vs-sidebar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  // async asyncData({ store, params }) {
  //   const lessonSlug = params.slug
  //   console.log('Мы вошли')
    
  //   console.log('current theme', currentTheme)
  //   return { currentTheme }
  // },

  data() {
    return {
      active: '',
    }
  },

  computed: {
    ...mapState('courses', [
      'courseName',
      'currentLesson',
      'currentTheme'
    ]),
    ...mapGetters('courses', ['currentLessons', 'isLastTheme', 'nextThemeFirstLessonSlug'])
  },

  mounted() {
    this.active = this.currentLesson.slug
  },
}
</script>

<style lang="scss">
.vs-button {
  transition: all .5s ease-in-out;
}

.vs-sidebar__logo {
  transition: all .25s ease-in-out;
  margin-left: 10px;
  padding-bottom: 0;
}

aside .reduce {
  .vs-sidebar__logo {
    color: transparent !important;
    transform: translateX(-200px);
  }

  .vs-button {
      transform: translateX(-200px);
      opacity: 0;
  }
}

.vs-sidebar-content {
  height: calc(100vh - 90px) !important;
}
</style>
