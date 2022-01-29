<template>
    <LoginDialog :active="true"/>
</template>

<script>
import LoginDialog from '~/components/auth/LoginDialog'

export default {
    name: 'LoginPage',
    components: {
        LoginDialog
    }
}
</script>