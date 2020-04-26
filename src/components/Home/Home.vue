<template>
    <div class="title">
       <h2>HOME PAGE</h2>
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: 'Home',
        data(){
            return{

            }
        },
        mounted(){
            console.log(firebase.auth().currentUser)
        }
    }
</script>

<style>

</style>