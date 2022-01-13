// const coursesImagePath = 'img/courses-cards'

export const state = () => ({
  courseName: 'designer-interfaces',
  courses: [],
  currentLesson: {},
  currentTheme: {}
})

export const mutations = {
  setCoursesList(state, courses) {
    state.courses = courses
  },
  setCurrentLesson(state, lesson) {
    state.currentLesson = lesson
  },
  setCurrentTheme(state, theme) {
    state.currentTheme = theme
  }
}

export const actions = {
  async getCoursesList({ commit }) {
    const courses = await this.$axios.$get('/courses/')
    commit('setCoursesList', courses)
  },

  async getLesson({ commit }, lessonSlug) {
    const lesson = await this.$axios.$get(`/lesson/${lessonSlug}`)
    commit('setCurrentLesson', lesson)
    return lesson
  },

  async getLessonTheme({ commit }, lessonSlug) {
    const theme = await this.$axios.$get(`/lesson/${lessonSlug}/theme`)
    commit('setCurrentTheme', theme) 
    return theme
  }


}

export const getters = {
  currentLessons(state) {
    return state.currentTheme.lessons
  },
  isLastTheme(state) {
    return state.currentTheme.is_last
  },
  nextThemeFirstLessonSlug(state) {
    return state.currentTheme.next_theme_first_lesson_slug
  }
  // currentCourseThemes(state) {
  //   return state.currentCourse.themes
  // },
  // countThemesOnCourse(state, getters) {
  //   return getters.currentCourseThemes.length
  // },
  // lastThemeIndex(state, getters) {
  //   return getters.countThemesOnCourse - 1
  // },
  // currentThemeIndex(state, getters) {
  //   return getters.currentCourseThemes.findIndex(
  //     (theme) => theme === state.currentTheme
  //   )
  // },
  // isLastTheme(state, getters) {
  //   return getters.currentThemeIndex === getters.lastThemeIndex
  // },
  // nextThemeSlug(state, getters) {
  //     const nextThemeIndex = getters.currentThemeIndex + 1
  //     return getters.currentCourseThemes[nextThemeIndex].slug
  // },
  // nextThemePath(state, getters) {
  //     const path = `/${state.courseName}/${state.currentCourse.slug}/${getters.nextThemeSlug}/lesson1`
  //     return path
  // }
}
