<template>
    <div>
        <router-link :to="{ name : 'DeleteCase'}">Delete Case</router-link>
        <router-link :to="{ name : 'DeleteCaseElement'}">Delete Case Element</router-link>
    </div>
</template>

<script>
    export default {
        name: 'Delete'
    }
</script>