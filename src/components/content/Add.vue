<template>
    <div>
        <router-link :to="{ name : 'AddCase'}">Add Case</router-link>
        <router-link :to="{ name : 'AddPleading'}">Add Pleading</router-link>
        <router-link :to="{ name : 'AddNote'}">Add Note</router-link>
        <router-link :to="{ name : 'AddTerm'}">Add Term</router-link>
    </div>
</template>

<script>
    export default {
        name: 'Add'
    }
</script>

<style>

</style>