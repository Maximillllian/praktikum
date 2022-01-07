const coursesImagePath = 'img/courses-cards'

export const state = () => ({
  courseName: 'designer-interfaces',
  courses: [
    {
      title: '1. Процесс обучения, когда ты взрослый',
      img: `${coursesImagePath}/1-1.svg`,
      slug: 'courseOne',
      themes: [
        {
          title: 'Процесс обучения',
          slug: 'theme1',
          lessons: [
            { title: '1. Ожидание и реальность', slug: 'lesson1' },
            { title: '2. Это нормально', slug: 'lesson2' },
            { title: '3. Важность софтов', slug: 'lesson3' },
            { title: '4. Вопросы', slug: 'lesson4' },
            { title: '5. Ошибки', slug: 'lesson5' },
            { title: '6. Обратная связь', slug: 'lesson6' },
            { title: '7. Планируем первый спринт', slug: 'lesson7' },
          ],
        },
      ],
    },
    {
      title: '2. Зачем дизайнеру прокачивать насмотренность',
      img: `${coursesImagePath}/1-2.svg`,
      slug: 'courseTwo',
      themes: [
        {
          title: '1. Что такое насмотренность',
          slug: 'theme1',
          lessons: [
            { title: '1. Супер-навык', slug: 'lesson1' },
            { title: '2. Что такое насмотренность', slug: 'lesson2' },
            { title: '3. Зачем нужна насмотренность', slug: 'lesson3' },
            { title: '4. Эстетическая совесть', slug: 'lesson4' },
          ],
        },
        {
          title: '2. Куда смотреть',
          slug: 'theme2',
          lessons: [{ title: '1. Полезные ресурсы', slug: 'lesson1' }],
        },
        {
          title: '3. Игра-прокачка насмотренности',
          slug: 'theme3',
          lessons: [
            { title: '1. Смотри внимательнее', slug: 'lesson1' },
            { title: '2. Раунд первый', slug: 'lesson2' },
            { title: '3. Раунд второй', slug: 'lesson3' },
            { title: '4. Раунд третий', slug: 'lesson4' },
            { title: '5. Раунд четвёртый', slug: 'lesson5' },
            { title: '6. Раунд пятый. Заключительный', slug: 'lesson6' },
          ],
        },
        {
          title: '4. Как насматриваться',
          slug: 'theme4',
          lessons: [
            { title: '1. Режим исследователя', slug: 'lesson1' },
            { title: '2. Как анализировать чужие работы', slug: 'lesson2' },
            { title: '3. Как рассуждают дизайнеры', slug: 'lesson3' },
            { title: '4. Референсы', slug: 'lesson4' },
            { title: '5. Что здесь можно улучшить', slug: 'lesson5' },
            { title: '6. Кради как дизайнер', slug: 'lesson6' },
            { title: '7. Мозговая библиотека', slug: 'lesson7' },
            {
              title: '8. Мини-проект. Конструктор приложения',
              slug: 'lesson8',
            },
          ],
        },
        {
          title: '5. Мудборд и вдохновение',
          slug: 'theme5',
          lessons: [
            { title: '1. Что такое мудборд', slug: 'lesson1' },
            { title: '2. Зачем ещё нужен мудборд', slug: 'lesson2' },
            { title: '3. Как собирать мудборд', slug: 'lesson3' },
            { title: '4. Инструкция по созданию мудборда', slug: 'lesson4' },
            { title: '5. Где ещё искать референсы', slug: 'lesson5' },
          ],
        },
        {
          title: '6. Самостоятельная работа',
          slug: 'theme6',
          lessons: [
            { title: '1. Про кругозор', slug: 'lesson1' },
            { title: '2. Креативность', slug: 'lesson2' },
            { title: '3. Итоги теоретической части спринта', slug: 'lesson3' },
          ],
        },
      ],
    },
  ],
  currentLessons: [],
  currentLesson: {},
  currentCourse: {},
  currentTheme: {},
  currentThemeIndex: 0,
})

export const mutations = {
  setCurrentLessons(state, lessons) {
    state.currentLessons = lessons
  },
  setCurrentLesson(state, lesson) {
    state.currentLesson = lesson
  },
  setCurrentCourse(state, course) {
    state.currentCourse = course
  },
  setCurrentTheme(state, theme) {
    state.currentTheme = theme
  },
}

export const actions = {
  async setCurrentStates({ dispatch, commit }, { courseSlug, themeSlug }) {
    const currentCourse = await dispatch('getCourse', courseSlug)
    const currentTheme = await dispatch('getTheme', { courseSlug, themeSlug })
    commit('setCurrentCourse', currentCourse)
    commit('setCurrentTheme', currentTheme)
  },

  getCourse({ state }, courseSlug) {
    return state.courses.filter((course) => course.slug === courseSlug)[0]
  },

  async getTheme({ state, dispatch }, { courseSlug, themeSlug }) {
    const course = await dispatch('getCourse', courseSlug)
    const theme = course.themes.filter((theme) => theme.slug === themeSlug)[0]
    return theme
  },

  async getLessonsOfTheme({ dispatch }, { courseSlug, themeSlug }) {
    const theme = await dispatch('getTheme', { courseSlug, themeSlug })
    return theme.lessons
  },

  setCurrentLessons({ commit }, lessons) {
    commit('setCurrentLessons', lessons)
  },

  setCurrentLesson({ commit }, lesson) {
    commit('setCurrentLesson', lesson)
  },
}

export const getters = {
  currentCourseThemes(state) {
    return state.currentCourse.themes
  },
  countThemesOnCourse(state, getters) {
    return getters.currentCourseThemes.length
  },
  lastThemeIndex(state, getters) {
    return getters.countThemesOnCourse - 1
  },
  currentThemeIndex(state, getters) {
    return getters.currentCourseThemes.findIndex(
      (theme) => theme === state.currentTheme
    )
  },
  isLastTheme(state, getters) {
    return getters.currentThemeIndex === getters.lastThemeIndex
  },
  nextThemeSlug(state, getters) {
      const nextThemeIndex = getters.currentThemeIndex + 1
      return getters.currentCourseThemes[nextThemeIndex].slug
  },
  nextThemePath(state, getters) {
      const path = `/${state.courseName}/${state.currentCourse.slug}/${getters.nextThemeSlug}/lesson1`
      return path
  }
}
