<template>
  <div>
    <h2>Ваши курсы</h2>
    <div class="courses">
      <template v-for="course in courses">
        <div :key="course.title" class="course" @click="handleClick(course)">
          <CourseCard :course="course" />
        </div>
      </template>
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
  data() {
    return {
      selectedCourse: null,
      active: false,
    }
  },
  computed: {
    ...mapState('courses', ['courses']),
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
  gap: 1rem;
}

.course {
}
</style>
