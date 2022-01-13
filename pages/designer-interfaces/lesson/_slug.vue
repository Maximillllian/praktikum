/* eslint-disable vue/no-v-html */
<template>
  <div>
    <div id="lesson" v-html="lesson.text"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  reviveCardQuiz,
  reviveRadioQuiz,
  hideFeedback,
  reviveCheckboxQuiz,
} from '~/assets/js/quiz'

export default {
  name: 'LessonIndex',
  layout: 'lesson',
  
  async asyncData({ store, params, error }) {
    const lessonSlug = params.slug;
    console.log('params', params)
    try {
      const lesson = await store.dispatch('courses/getLesson', lessonSlug);
      const currentTheme = await store.dispatch('courses/getLessonTheme', lessonSlug);
      return { lesson, currentTheme }
    } catch (err) {
      throw error({statusCode: 404, message: 'Урок не найден'})
    }
  },

  computed: {
    ...mapState('courses/currentLesson')
  },

  mounted() {
    hideFeedback()
    reviveCardQuiz()
    reviveRadioQuiz()
    reviveCheckboxQuiz()
  },
}
</script>

<style lang="scss">
#lesson {
  // margin-bottom: 50px;

  * {
    color: white !important;
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

.checbox-group:not(.selected) {
  .quiz__item:before {
    background-color: transparent !important;
  }
}

.quiz__group:not(.selected) {
  .quiz__item {
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
