<template>
    <RegisterDialog :active="true" />
</template>

<script>
import RegisterDialog from '~/components/auth/RegisterDialog'

export default {
    name: 'RegisterPage',
    auth: false,
    components: {
        RegisterDialog
    }
}
</script>