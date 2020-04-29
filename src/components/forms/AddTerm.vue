<template>
    <div @submit.prevent="addTerm" class="signup container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Dodaj Termin</h2>
            <div class="field">
                <label for="toCase">Nazwa sprawy</label>
                <input type="text" name="toCase" v-model="toCase">
            </div>
            <div class="field">
                <label for="termName">Nazwa Terminu</label>
                <input type="text" name="termName" v-model="termName">
            </div>
            <div class="field">
                <label for="date">Date</label>
                <input type="date" name="date" v-model="date">
            </div>
            <div class="field">
                <label for="startTime">Od godziny:</label>
                <input type="time" name="startTime" v-model="startTime">
            </div>
            <div class="field">
                <label for="endTime">Do godziny:</label>
                <input type="time" name="endTime" v-model="endTime">
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
                <button class="btn deep-purple">Dodaj termin</button>
            </div>
        </form>
    </div>
</template>

<script>
    import firebase from "firebase";
    import db from '@/firebase/init'
    export default {
        name: 'AddTerm',
        data(){
            return{
                caseList: [],
                termName: null,
                toCase: null,
                date: null,
                startTime: null,
                endTime: null,
                city: null,
                note: null,
                feedback: null
            }
        },
        methods: {
            addTerm(){
                if(this.termName && this.toCase && this.date && this.note && this.startTime && this.endTime && this.city){
                    let user = firebase.auth().currentUser;
                    let userID = user.uid
                    db.collection('cases').doc(userID).collection('userCases').doc(this.toCase)
                        .collection('Terms').doc(this.termName).set({
                        name: this.termName,
                        date: this.date,
                        startTime: this.startTime,
                        endTime: this.endTime,
                        city: this.city,
                        note: this.note
                    }).then(() => {
                        this.feedback = 'Term successfully added';
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