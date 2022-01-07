<template>
  <div>
    <div id="lesson" v-html="lessonContent"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { readLessonHTML } from '~/assets/js/api'
import { reviveCardQuiz, reviveRadioQuiz, hideFeedback } from '~/assets/js/quiz'

export default {
  name: 'LessonIndex',
  layout: 'lesson',
  async asyncData({ store, route, error }) {
    const pathParams = route.path.split('/')
    const [lessonSlug, themeSlug, courseSlug] = pathParams.reverse().slice(0, 3)
    let lessons
    let lessonContent
    let currentLesson

    try {
      lessons = await store.dispatch('courses/getLessonsOfTheme', {
        courseSlug,
        themeSlug,
      })
      lessonContent = readLessonHTML(courseSlug, themeSlug, lessonSlug).default
      currentLesson = lessons.filter((lesson) => lesson.slug === lessonSlug)[0]
    } catch (err) {
      error({ statusCode: 404, message: 'Урок не найден' })
    }

    await store.dispatch('courses/setCurrentLessons', lessons)
    await store.dispatch('courses/setCurrentLesson', currentLesson)

    return { lessons, lessonContent }
  },
  mounted() {
    hideFeedback()
    reviveCardQuiz()
    reviveRadioQuiz()
  },
  methods: {
    ...mapActions('courses', ['getLessonsOfTheme']),
  },
}
</script>

<style lang="scss">
#lesson {
  // margin-bottom: 50px;

  * {
    background-color: var(--black) !important;
  }

  header {
    display: none !important;
  }

  .quiz-task {
    --quizeBackground: var(--greyBlack);
    background-color: var(--quizeBackground) !important;

    * {
      background-color: var(--quizeBackground) !important;
    }
  }

  .quiz__feedback {
    color: var(--answer-color) !important;

    .paragraph {
      color: var(--answer-color) !important;
    }
  }
}

.quiz__answer-card {
  pointer-events: initial !important;
  cursor: pointer !important;
}

.quiz__group:not(.selected) {
  .quiz__item_correct {
    &:before {
      background-color: transparent !important;
    }
  }
  .quiz__item:hover {
    opacity: 0.5 !important;
  }

  div {
    cursor: pointer !important;
  }

  .quiz.quiz_type_select.quiz_answered .quiz__option-container .quiz__option {
    cursor: pointer !important;
  }
}

.quiz__feedback {
    // display: initial !important;

    .paragraph {
      opacity: 0.5 !important;
    }
  }

// Когда на вопрос ответили
.selected .quiz__group.selected {
  .quiz__item {
  }

  .quiz__item:hover {
    opacity: 1 !important;
  }

  .quiz__feedback {
    display: initial !important;

    .paragraph {
      opacity: 0.5 !important;
    }
  }

  .quiz__item_correct {
    opacity: 1 !important;
    position: relative;

    .paragraph {
      opacity: 1 !important;
    }

    &:before {
      //   left: 22px;
      z-index: 100 !important;
      background-color: var(--answer-color);
    }
  }
}

#lesson .page__content {
  min-width: 0 !important;
}

#lesson .theory-viewer__block_type_vertical-layout.theory-viewer__block {
  //   max-width: 700px !important;
}
</style>
