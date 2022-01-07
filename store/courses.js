const coursesImagePath = 'img/courses-cards'

export const state = () => ({
    courses: [
        {
            title: '1. Процесс обучения, когда ты взрослый',
            img: `${coursesImagePath}/first.svg`,
            slug: 'courseOne',
            themes: [
                {
                    title: 'Процесс обучения',
                    slug: 'theme1',
                    lessons: [
                        {title: '1. Ожидание и реальность', slug: 'lesson1'},
                        {title: '2. Это нормально', slug: 'lesson2'},
                        {title: '3. Важность софтов', slug: 'lesson3'},
                        {title: '4. Вопросы', slug: 'lesson4'},
                        {title: '5. Ошибки', slug: 'lesson5'},
                        {title: '6. Обратная связь', slug: 'lesson6'},
                        {title: '7. Планируем первый спринт', slug: 'lesson7'},

                    ]
                }
            ]
        }
    ],
    currentLessons: [],
    currentLesson: {}
})

export const mutations = {
    setCurrentLessons(state, lessons) {
        state.currentLessons = lessons;
    },
    setCurrentLesson(state, lesson) {
        state.currentLesson = lesson;
    }
}

export const actions = {
    getTheme({ state }, {courseSlug, themeSlug}) {
        const course = state.courses.filter(course => course.slug === courseSlug)[0];
        const theme = course.themes.filter(theme => theme.slug === themeSlug)[0];
        return theme;
    },
    async getLessonsOfTheme({ dispatch }, {courseSlug, themeSlug}) {
        const theme = await dispatch('getTheme', {courseSlug, themeSlug});
        return theme.lessons;
    },
    setCurrentLessons({ commit }, lessons) {
        commit('setCurrentLessons', lessons)
    },
    setCurrentLesson({ commit }, lesson) {
        commit('setCurrentLesson', lesson);
    } 
}