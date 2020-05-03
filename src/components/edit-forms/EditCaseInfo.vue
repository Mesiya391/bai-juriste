<template>
    <div @submit.prevent="editCase" class="signup container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Edytuj sprawę</h2>
            <div class="field">
                <label>Wybierz sprawę </label>
                <select class="browser-default" v-model="caseDel" @change="createElementList">
                    <option value="" disabled selected>Choose your option</option>
                    <option v-for="item in caseList" :value="item" v-bind:key="item">{{item}}</option>
                </select>
            </div>
            <div class="field">
                <label for="name">Nazwa sprawy</label>
                <input type="text" name="name" v-model="newName">
            </div>
            <div class="field">
                <label for="client">Klient</label>
                <input type="text" name="client" v-model="newClient">
            </div>
            <div class="field">
                <label for="clientAddress">Adres klienta</label>
                <input type="text" name="clientAddress" v-model="newClientAddress">
            </div>
            <div class="field">
                <label for="party">Strona przeciwna</label>
                <input type="text" name="party" v-model="newParty">
            </div>
            <div class="field">
                <label for="partyAddress">Strona przeciwna adres</label>
                <input type="text" name="partyAddress" v-model="newPartyAddress">
            </div>
            <div class="field">
                <label for="court">Sąd</label>
                <input type="text" name="court" v-model="newCourt">
            </div>
            <div class="field">
                <label for="wps">Wartość przedmiotu sporu</label>
                <input type="text" name="wps" v-model="newWps">
            </div>
            <div class="field">
                <label for="attorney">Pełnomocnik strony przeciwnej</label>
                <input type="text" name="attorney" v-model="newAttorney">
            </div>
            <div class="field">
                <label for="caseID">Sygnatura sprawy</label>
                <input type="text" name="caseID" v-model="newCaseID">
            </div>
            <p class="red-text center" v-if="feedback">{{feedback}}</p>
            <div class="field center">
                <button class="btn deep-purple">Edytuj sprawę</button>
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
                feedback: null,
                newName: null,
                newClient: null,
                newClientAddress: null,
                newParty: null,
                newPartyAddress: null,
                newCourt: null,
                newWps: null,
                newCaseID: null,
                newAttorney: null
            }
        },
        methods: {
            editCase: function () {
                let user = firebase.auth().currentUser;
                let userID = user.uid
                if (this.newName) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .update({
                        name: this.newName,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newClient) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .update({
                        client: this.newClient,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newClientAddress) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .update({
                        clientAddress: this.newClientAddress,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newParty) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .update({
                        party: this.newParty,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newPartyAddress) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                       .update({
                        partyAddress: this.newPartyAddress,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newAttorney) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .update({
                        attorney: this.newAttorney,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newCourt) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .update({
                        court: this.newCourt,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newWps) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .update({
                        wps: this.newWps,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
                if (this.newCaseID) {
                    db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel)
                        .update({
                        caseID: this.newCaseID,
                    })
                        .then(() => {
                            this.feedback = 'Element successfully edited';
                        })
                }
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