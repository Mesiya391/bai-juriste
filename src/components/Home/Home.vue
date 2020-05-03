<template>
    <div class="title">
       <h2 class="center">Home Page</h2>
        <Warning/>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import Warning from "../layout/Warning";
    export default {
        name: 'Home',
        components:{
          Warning
        },
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