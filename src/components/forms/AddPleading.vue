<template>
    <div @submit.prevent="addPleading" class="signup container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Dodaj Pismo</h2>
            <div class="field">
                <label for="toCase">Nazwa sprawy</label>
                <input type="text" name="toCase" v-model="toCase">
            </div>
            <div class="field">
                <label for="pleadingName">Nazwa Pisma</label>
                <input type="text" name="pleadingName" v-model="pleadingName">
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
                <button class="btn deep-purple">Dodaj pismo</button>
            </div>
        </form>
    </div>
</template>

<script>
    import firebase from "firebase";
    import db from '@/firebase/init'
    export default {
        name : 'AddPleading',
        data(){
            return{
                caseList: [],
                pleadingName: null,
                toCase: null,
                date: null,
                note: null,
                feedback: null
            }
        },
        methods: {
            addPleading(){
                console.log(this.pleadingName, this.toCase, this.date, this.note)
                if(this.pleadingName && this.toCase && this.date &&this.note){
                    let user = firebase.auth().currentUser;
                    let userID = user.uid
                    db.collection('cases').doc(userID).collection('userCases').doc(this.toCase)
                        .collection('Pleadings').doc(this.pleadingName).set({
                        name: this.pleadingName,
                        date: this.date,
                        note: this.note
                    }).then(() => {
                        this.feedback = 'Pleading successfully added';
                    })
                }else{
                    this.feedback = 'Please fill in all fields'
                }
            }
        }
    }


</script>