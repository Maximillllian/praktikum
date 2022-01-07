<template>
    <div class="lesson-layout-wrapper">
        <header>
            <TheHeader />
        </header>
        <aside>
            <AsideLesson />
        </aside>
        <main>
            <Nuxt />
        </main>
    </div>
</template>

<script>
import AsideLesson from '~/components/aside-lesson'
import TheHeader from '~/components/TheHeader'

export default {
    components: {
        AsideLesson,
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
.lesson-layout-wrapper {
    display: grid;
    grid-template-areas: 
        'header'
        'content';
    grid-auto-columns: auto;
}

header {
    grid-area: header;
}

aside {
    grid-area: aside;
    position: fixed;
    display: block;
    left: 0;
    top: 80px;
    z-index: 1501055;
}

main {
    grid-area: content;
    // justify-self: start;
}
</style>