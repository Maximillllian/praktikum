<template>
    <vs-card type="3">
        <template #title>
            <h3>{{ course.title }}</h3>
        </template>
        <template #img>
            <img :src="course.image" alt="">
        </template>
        <template #text>
            <p>{{ themesCount }} тем/а</p>
        </template>
    </vs-card>
</template>

<script>
export default {
    props: {
        course: {
            type: Object,
            default() {
                return {
                    title: 'Курс Яндекса!',
                    image: 'img/courses-cards/first.svg',
                    description: 'Это курс'
                }
            }
        }
    },
    computed: {
        themesCount() {
            return this.course.themes.length
        }
    }
}
</script>

<style lang="scss" scoped>
img {
    // max-width: 210px;
}
</style>