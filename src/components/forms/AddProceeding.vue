<template>
    <div @submit.prevent="addProceeding" class="signup container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Dodaj wydarzenie</h2>
            <div class="field">
                <label for="toCase">Nazwa sprawy</label>
                <input type="text" name="toCase" v-model="toCase">
            </div>
            <div class="field">
                <label for="proceedingName">Nazwa wydarzenia</label>
                <input type="text" name="proceedingName" v-model="proceedingName">
            </div>
            <div class="field">
                <label for="date">Date</label>
                <input type="date" name="date" v-model="date">
            </div>
            <div class="field">
                <label for="city">Miasto</label>
                <input type="text" name="city" v-model="city">
            </div>
            <div class="field">
                <label for="note">Notatka</label>
                <input type="text" name="note" v-model="note">
            </div>
            <p class="red-text center" v-if="feedback">{{feedback}}</p>
            <div class="field center">
                <button class="btn deep-purple">Dodaj wydarzenie</button>
            </div>
        </form>
    </div>
</template>

<script>
    import firebase from "firebase";
    import db from '@/firebase/init'
    export default {
        name : 'AddProceeding',
        data(){
            return{
                caseList: [],
                proceedingName: null,
                toCase: null,
                date: null,
                city: null,
                note: null,
                feedback: null
            }
        },
        methods: {
            addProceeding(){
                if(this.proceedingName && this.toCase && this.date && this.city && this.note){
                    let user = firebase.auth().currentUser;
                    let userID = user.uid
                    db.collection('cases').doc(userID).collection('userCases').doc(this.toCase)
                        .collection('Proceedings').doc(this.proceedingName).set({
                        name: this.proceedingName,
                        date: this.date,
                        city: this.city,
                        note: this.note
                    }).then(() => {
                        this.feedback = 'Proceeding successfully added';
                    })
                }else{
                    this.feedback = 'Please fill in all fields'
                }
            }
        }
    }

</script>

<style>

</style>