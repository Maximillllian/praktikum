<template>
  <vs-dialog v-if="course" v-model="activeCopy" blur @close="handleClose">
    <template #header>
      <h3>{{ course.title }}</h3>
    </template>
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th>Тема</vs-th>
          <vs-th>Количество занятий</vs-th>
        </vs-tr>
      </template>

      <template #tbody>
        <vs-tr v-for="theme in course.themes" :key="theme.title">
          <vs-td >{{ theme.title }}</vs-td>
          <vs-td>{{ theme.lessons.length }}</vs-td>

          <template #expand>
              <vs-table id="expanded-table" stripped>
                  <template #thead>
                      <vs-tr>
                          <vs-th>Занятие</vs-th>
                          <vs-th>Пройдено?</vs-th>
                      </vs-tr>
                  </template>
                  <template #tbody>
                      <vs-tr v-for="lesson in theme.lessons" :key="lesson.title" @click.prevent="goToCourseLesson(course, theme, lesson)">
                          <vs-td>{{ lesson.title }}</vs-td>
                          <vs-td>Нет</vs-td>
                      </vs-tr>
                  </template>
              </vs-table>
              <!-- <ol>
                <li v-for="(lesson, idx) in theme.lessons" :key="idx">
                  <a @click.prevent="goToCourseLesson(course, theme, lesson)">{{ lesson.title }}</a>
                </li>
              </ol> -->
          </template>
        </vs-tr>
      </template>
    </vs-table>
  </vs-dialog>
</template>

<script>
export default {
  name: 'CourseDialog',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    course: {
      type: Object,
      default() {
        return {
          title: 'Курс Яндекса!',
          image: 'img/courses-cards/first.svg',
          description: 'Это курс',
          slug: 'course1',
          themes: {
            themeOne: {
              title: 'Тема 1',
              slug: 'theme1',
              lessons: [
                  {title: 'Задание 1', slug: 'lesson1'}, 
                  {title: 'Задание 2', slug: 'lesson2'}, 
                  {title: 'Задание 3', slug: 'lesson3'}, 
                ],
            },
            themeTwo: {
              title: 'Тема 1',
              slug: 'theme1',
              lessons: [
                  {title: 'Задание 1', slug: 'lesson1'}, 
                  {title: 'Задание 2', slug: 'lesson2'}, 
                  {title: 'Задание 3', slug: 'lesson3'}, 
                ],
            },
          },
        }
      },
    },
  },
  data() {
      return {
          selectedRow: null
      }
  },
  computed: {
    activeCopy() {
      return this.active
    },
  },
  methods: {
    handleClose() {
      this.$emit('update:active', false)
    },
    goToCourseLesson(course, theme, lesson) {
        this.$router.push(`/designer-interfaces/${course.slug}/${theme.slug}/${lesson.slug}`)
    }
  },
}
</script>

<style lang="scss" scoped>
#expanded-table td {
    padding: 10px;
}

#expanded-table tr {
    cursor: pointer;
}

#expanded-table tr:hover td {
    background-color: var(--shadowRoyalBlue) !important;
}
</style>