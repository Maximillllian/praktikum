<template>
  <vs-dialog v-if="module" v-model="activeCopy" blur @close="handleClose">
    <template #header>
      <h3>{{ module.title }}</h3>
    </template>
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th>Тема</vs-th>
          <vs-th>Количество занятий</vs-th>
        </vs-tr>
      </template>

      <template #tbody>
        <vs-tr v-for="theme in module.themes" :key="theme.title">
          <vs-td>{{ theme.title }}</vs-td>
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
                <vs-tr
                  v-for="lesson in theme.lessons"
                  :key="lesson.title"
                  @click.prevent="goToModuleLesson(module, theme, lesson)"
                >
                  <vs-td>{{ lesson.title }}</vs-td>
                  <vs-td>Нет</vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <!-- <ol>
                <li v-for="(lesson, idx) in theme.lessons" :key="idx">
                  <a @click.prevent="goToModuleLesson(module, theme, lesson)">{{ lesson.title }}</a>
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
  name: 'ModuleDialog',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    module: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  data() {
    return {
      selectedRow: null,
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
    goToModuleLesson(module, theme, lesson) {
      if (lesson.webinar_link) {
        window.open(lesson.webinar_link, '_blank').focus()
      } else {
        this.$router.push(
          `/designer-interfaces/lesson/${lesson.slug}`
        )
      }
    },
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
