<template>
    <div @submit.prevent="editCase" class="AddCase container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Edytuj notatkę</h2>
            <div class="field">
                <label>Wybierz sprawę </label>
                <select class="browser-default" v-model="caseDel" @change="createElementList">
                    <option value="" disabled selected>Choose your option</option>
                    <option v-for="item in caseList" :value="item" v-bind:key="item">{{item}}</option>
                </select>
            </div>
            <div class="field">
                <label>Wybierz element </label>
                <select class="browser-default" v-model="elementName" >
                    <option value="elementName" disabled selected>Choose your option</option>
                    <option v-for="item in elementList" :value="item" v-bind:key="item">{{item}}</option>
                </select>
            </div>
            <div class="field">
                <label for="noteName">Nazwa Notatki</label>
                <input type="text" name="noteName" v-model="noteName" >
            </div>
            <div class="field">
                <label for="date">Date</label>
                <input type="date" name="date" v-model="date" >
            </div>
            <div class="field">
                <label for="note">Notatka</label>
                <input type="text" name="note" v-model="noteNote">
            </div>
            <p class="red-text center" v-if="feedback">{{feedback}}</p>
            <div class="field center">
                <button class="btn deep-purple">Edytuj notatkę</button>
            </div>

        </form>
    </div>


</template>

<script>
    import firebase from "firebase";
    import db from '@/firebase/init';

    export default {
        name: 'EditNote',
        data(){
            return{
                caseDel: null,
                caseList: [],
                elementList: [],
                chosenElement: 'Notes',
                elementName: null,
                feedback: null,
                noteName: null,
                date: null,
                noteNote: null
            }
        },
        methods: {
            editCase: function () {
                let user = firebase.auth().currentUser;
                let userID = user.uid
                if (this.noteName) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .collection(this.chosenElement).doc(this.elementName).update({
                        name: this.noteName,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.date) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .collection(this.chosenElement).doc(this.elementName).update({
                        date: this.date,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.noteNote) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .collection(this.chosenElement).doc(this.elementName).update({
                        note: this.noteNote,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
            },
            createElementList: function () {
                let elementList = this.elementList
                let user = firebase.auth().currentUser;
                let userID = user.uid
                db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                    .collection(this.chosenElement)
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach(function (doc) {
                            // doc.data() is never undefined for query doc snapshots
                            elementList.push(doc.id)
                            console.log(doc.id, " => ", doc.data(), elementList);
                        });
                    })
                    .catch(function (error) {
                        console.log("Error getting documents: ", error);
                    });
            },
            /*setValues: function(){
                let user = firebase.auth().currentUser;
                let userID = user.uid
                let noteName = this.noteName
                let date = this.date
                let note = this.noteNote
                db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                    .collection(this.chosenElement)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            let a = doc.data()
                            noteName = a.noteName
                            date = a.date
                            note = a.note
                            console.log(noteName, date, note);
                        });
                    })
            }
        }*/},
        created: function () {
            let caseList = this.caseList
            let user = firebase.auth().currentUser;
            let userID = user.uid
            db.collection('cases').doc(userID).collection('userCases')
                .get()
                .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        // doc.data() is never undefined for query doc snapshots
                        caseList.push(doc.id)
                            console.log(doc.id, " => ", doc.data(), caseList);
                        });
                    })
                    .catch(function (error) {
                        console.log("Error getting documents: ", error);
                    });
            }
    }

</script>