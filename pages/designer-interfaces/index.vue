<template>
  <div class="sprints">
    <div v-for="sprint in sprints" :key="sprint.slug" class="sprint">
      <h2>{{ sprint.title }}</h2>
      <div class="modules">
        <template v-for="module in sprint.modules">
          <div :key="module.title" class="module" @click="handleClick(module)">
            <ModuleCard :module="module" />
          </div>
        </template>
      </div>
    </div>
    <ModuleDialog :active.sync="active" :module="selectedModule" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ModuleCard from '~/components/module-card'
import ModuleDialog from '~/components/module-lessons-dialog'

export default {
  name: 'InterfacesIndex',
  components: {
    ModuleCard,
    ModuleDialog,
  },
  async asyncData({ store }) {
    await store.dispatch('courses/getSprintsList')
  },
  data() {
    return {
      selectedModule: null,
      active: false,
    }
  },
  computed: {
    ...mapState('courses', ['sprints']),
  },
  mounted() {
    // console.log(this.modules)
  },
  methods: {
    ...mapActions('courses', ['getModule']),
    async handleClick(module) {
      try {
        const moduleData = await this.getModule(module.slug)
        this.selectedModule = moduleData
        this.active = true
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.modules {
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

.sprints {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  // padding-top: 2rem;
}
</style>
