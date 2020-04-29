<template>
    <div @submit.prevent="addNote" class="signup container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Dodaj Notatkę</h2>
            <div class="field">
                <label for="toCase">Nazwa sprawy</label>
                <input type="text" name="toCase" v-model="toCase">
            </div>
            <div class="field">
                <label for="noteName">Nazwa Notatki</label>
                <input type="text" name="noteName" v-model="noteName">
            </div>
            <div class="field">
                <label for="date">Date</label>
                <input type="date" name="date" v-model="date">
            </div>
            <div class="field">
                <label for="note">Notatka</label>
                <input type="text" name="note" v-model="note">
            </div>
            <p class="red-text center" v-if="feedback">{{feedback}}</p>
            <div class="field center">
                <button class="btn deep-purple">Dodaj notatkę</button>
            </div>
        </form>
    </div>
</template>

<script>
    import firebase from "firebase";
    import db from '@/firebase/init'
    export default {
        name : 'AddNote',
        data(){
            return{
                caseList: [],
                noteName: null,
                toCase: null,
                date: null,
                note: null,
                feedback: null
            }
        },
        methods: {
            addNote(){
                console.log(this.noteName, this.toCase, this.date, this.note)
                if(this.noteName && this.toCase && this.date && this.note){
                    let user = firebase.auth().currentUser;
                    let userID = user.uid
                    db.collection('cases').doc(userID).collection('userCases').doc(this.toCase)
                        .collection('Notes').doc(this.noteName).set({
                        name: this.noteName,
                        date: this.date,
                        note: this.note
                    }).then(() => {
                        this.feedback = 'Note successfully added';
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