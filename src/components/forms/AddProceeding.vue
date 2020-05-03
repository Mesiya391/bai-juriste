<template>
    <div @submit.prevent="addProceeding" class="AddCase container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Dodaj wydarzenie</h2>
            <div class="field">
                <label>Wybierz sprawę</label>
                <select class="browser-default" v-model="toCase">
                    <option value="" disabled selected>Choose your option</option>
                    <option v-for="item in caseList" :value="item" v-bind:key="item">{{item}}</option>
                </select>
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
        },
        created: function() {
            let caseList = this.caseList
            let user = firebase.auth().currentUser;
            let userID = user.uid
            db.collection('cases').doc(userID).collection('userCases')
                .get()
                .then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        caseList.push(doc.id)
                        console.log(doc.id, " => ", doc.data(), caseList);
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

        }
    }

</script>

<style>

</style>