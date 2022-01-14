<template>
  <div>
    <div v-for="sprint in sprints" :key="sprint.slug" class="sprint">
      <h2>{{ sprint.title }}</h2>
      <div class="courses">
        <template v-for="course in sprint.courses">
          <div :key="course.title" class="course" @click="handleClick(course)">
            <CourseCard :course="course" />
          </div>
        </template>
      </div>
    </div>
    <CourseDialog :active.sync="active" :course="selectedCourse" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CourseCard from '~/components/course-card'
import CourseDialog from '~/components/course-lessons-dialog'

export default {
  name: 'InterfacesIndex',
  components: {
    CourseCard,
    CourseDialog,
  },
  async asyncData({ store }) {
    await store.dispatch('courses/getSprintsList')
  },
  data() {
    return {
      selectedCourse: null,
      active: false,
    }
  },
  computed: {
    ...mapState('courses', ['sprints']),
  },
  mounted() {
    // console.log(this.courses)
  },
  methods: {
    handleClick(course) {
      this.selectedCourse = course
      this.active = true
    },
  },
}
</script>

<style lang="scss" scoped>
.courses {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 1rem;

  @media screen and (max-width: 991.98px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 767.98px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
}

.course {
}
</style>
