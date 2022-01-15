<template>
    <vs-card type="3">
        <template #title>
            <h3>{{ module.title }}</h3>
        </template>
        <template #img>
            <!-- <img :src="module.image" alt=""> -->
            <img src="img/courses-cards/4-4.svg" alt="">
        </template>
        <template #text>
            <p>{{ themesCount }} тем/а</p>
        </template>
    </vs-card>
</template>

<script>
export default {
    props: {
        module: {
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
            return this.module.themes.length
        }
    }
}
</script>

<style lang="scss" scoped>
img {
    // max-width: 210px;
}
</style>