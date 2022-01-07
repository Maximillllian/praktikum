<template>
    <div>
        <TheHeader />
        <div class="content">
            <Nuxt />
        </div>
    </div>
</template>

<script>
import TheHeader from '~/components/TheHeader'

export default {
    components: {
        TheHeader
    },
    head() {
        return {
            bodyAttrs: {
                class: 'darken'
            }
        }
    },
    mounted() {
        const body = document.querySelector('body');
        body.setAttribute('vs-theme', 'dark');
    }
}
</script>

<style lang="scss" scoped>
.content {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 15px;
}
</style>