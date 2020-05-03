<template>
    <div @submit.prevent="editCase" class="signup container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Edytuj wydarzenie</h2>
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
                <label for="noteName">Nazwa terminu</label>
                <input type="text" name="noteName" v-model="newName" >
            </div>
            <div class="field">
                <label for="date">Data</label>
                <input type="date" name="date" v-model="newDate" >
            </div>
            <div class="field">
                <label for="startTime">Od</label>
                <input type="time" name="startTime" v-model="newStartTime">
            </div>
            <div class="field">
                <label for="endTime">Do</label>
                <input type="time" name="endTime" v-model="newEndTime">
            </div>
            <div class="field">
                <label for="note">Miasto</label>
                <input type="text" name="note" v-model="newCity">
            </div>
            <div class="field">
                <label for="note">Notatka</label>
                <input type="text" name="note" v-model="newNote">
            </div>
            <p class="red-text center" v-if="feedback">{{feedback}}</p>
            <div class="field center">
                <button class="btn deep-purple">Edytuj termin</button>
            </div>

        </form>
    </div>


</template>

<script>
    import firebase from "firebase";
    import db from '@/firebase/init';

    export default {
        name: 'EditTerms',
        data(){
            return{
                caseDel: null,
                caseList: [],
                elementList: [],
                chosenElement: 'Terms',
                elementName: null,
                feedback: null,
                newName: null,
                newDate: null,
                newNote: null,
                newCity: null,
                newStartTime: null,
                newEndTime: null
            }
        },
        methods: {
            editCase: function () {
                let user = firebase.auth().currentUser;
                let userID = user.uid
                if (this.newName) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .collection(this.chosenElement).doc(this.elementName).update({
                        name: this.newName,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newDate) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .collection(this.chosenElement).doc(this.elementName).update({
                        date: this.newDate,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newNote) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .collection(this.chosenElement).doc(this.elementName).update({
                        note: this.newNote,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newCity) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .collection(this.chosenElement).doc(this.elementName).update({
                        city: this.newCity,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newStartTime) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .collection(this.chosenElement).doc(this.elementName).update({
                        startTime: this.newStartTime,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newEndTime) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .collection(this.chosenElement).doc(this.elementName).update({
                        endTime: this.newEndTime,
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
        },
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