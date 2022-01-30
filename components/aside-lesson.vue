<template>
  <vs-sidebar
    v-model="currentLessonSlug"
    :open="openSidebar"
    relative
    hover-expand
    reduce
  >
    <template #logo> Тема: {{ currentThemeTitle }} </template>
    <vs-sidebar-item
      v-for="lesson in currentLessons"
      :id="lesson.slug"
      :key="lesson.slug"
      @click.native="goToLesson(lesson.slug)"
    >
      <template #icon>
        <div :ref="lesson.slug"></div>
        <template v-if="!loading">
          <span v-if="lesson.is_complete" class="material-icons">done_all</span>
          <span v-else class="material-icons"> donut_large </span>
        </template>
      </template>
      {{ lesson.title }}
    </vs-sidebar-item>
    <vs-button border :to="`/${courseName}`">К курсам</vs-button>
    <vs-button
      v-if="!isLastTheme"
      :to="`/${courseName}/lesson/${nextThemeFirstLessonSlug}`"
      >Следующая тема</vs-button
    >
  </vs-sidebar>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    openSidebar: {
      type: Boolean,
      required: false,
      default: true,
    },
  },

  data() {
    return {
      loading: false
    }
  },

  computed: {
    ...mapState('courses', ['courseName', 'currentLesson']),
    ...mapGetters('courses', [
      'currentLessons',
      'currentLessonSlug',
      'currentThemeTitle',
      'isLastTheme',
      'nextThemeFirstLessonSlug',
    ]),

    isTabletOrLess() {
      const matchTablet = window.matchMedia('(max-width: 991.98px)')
      return matchTablet.matches
    },
  },

  methods: {
    goToLesson(lessonSlug) {
      const loading = this.$vs.loading({
        target: this.$refs[lessonSlug][0],
        scale: '0.6',
        type: 'waves'
      })
      this.$router.push(`./${lessonSlug}`)
      loading.close()
    }
  }
}
</script>

<style lang="scss">
.vs-button {
  transition: all 0.5s ease-in-out;
}

.vs-sidebar__logo {
  transition: all 0.25s ease-in-out;
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
