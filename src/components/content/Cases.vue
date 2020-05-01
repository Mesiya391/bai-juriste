<template>
    <div>
        <div class="container">
            <label>Wybierz sprawę</label>
            <select class="browser-default" v-model="selectedCase">
                <option value="" disabled selected>Choose your option</option>
                <option v-for="item in caseList" :value="item" v-bind:key="item">{{item}}</option>
            </select>
            <button @click="displayCaseInfo" class="btn deep-purple">Wybierz</button>
        </div>
        <div class="container">
            <h3 v-if="showElements">Informacje ogólne: {{ caseInfo.name }}</h3>
            <p v-if="showElements">Nazwa sprawy: {{ caseInfo.name }} </p>
            <p v-if="showElements">Sąd: {{ caseInfo.court }}</p>
            <p v-if="showElements">Wartość przedmiotu sporu: {{ caseInfo.wps }}</p>
            <p v-if="showElements">Sygnatura sprawy: {{ caseInfo.caseID }}</p>
        </div>
        <div class="container">
            <h3 v-if="showElements">Dane klienta: </h3>
            <p v-if="showElements">Klient: {{ caseInfo.client }}</p>
            <p v-if="showElements">Adres: {{ caseInfo.clientAddress }}</p>
        </div>
        <div class="container">
            <h3 v-if="showElements">Dane strony przeciwnej: </h3>
            <p v-if="showElements">Nazwa: {{ caseInfo.party }}</p>
            <p v-if="showElements">Adres: {{ caseInfo.partyAddress }}</p>
            <p v-if="showElements">Pełnomocnik: {{ caseInfo.attorney }}</p>
        </div>
        <div class="table container">
            <h3 v-if="showElements">Terminy</h3>
            <table class="centered highlight responsive-table" v-if="showElements">
                <thead>
                <tr>
                    <th v-for="col in termsColumnNames" v-bind:key="col" >{{ col }} </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in termsRows" v-bind:key="row">
                    <td v-for="column in termsColumns" v-bind:key="column">{{row[column]}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="table container">
            <h3 v-if="showElements">Wydarzenia</h3>
            <table class="centered highlight responsive-table" v-if="showElements">
                <thead>
                <tr>
                    <th v-for="col in proceedingsColumnNames" v-bind:key="col">{{ col }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in proceedingsRows" v-bind:key="row">
                    <td v-for="column in proceedingsColumns" v-bind:key="column">{{row[column]}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="table container">
            <h3 v-if="showElements">Pisma procesowe</h3>
            <table class="centered highlight responsive-table" v-if="showElements">
                <thead>
                <tr>
                    <th v-for="col in pleadingsColumnNames" v-bind:key="col">{{ col }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in pleadingsRows" v-bind:key="row">
                    <td v-for="column in pleadingsColumns" v-bind:key="column">{{row[column]}}</td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="table container">
            <h3 v-if="showElements">Notatki</h3>
            <table class="centered highlight responsive-table" v-if="showElements">
                <thead>
                <tr>
                    <th v-for="col in notesColumnNames" v-bind:key="col">{{ col }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in notesRows" v-bind:key="row">
                    <td v-for="column in notesColumns" v-bind:key="column">{{row[column]}}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import firebase from "firebase";
    import db from '@/firebase/init';
    export default {
        name: 'Cases',
        data() {
            return {
                caseList: [],
                selectedCase: null,
                caseInfo: {
                    name: "",
                    client: "",
                    clientAddress: "",
                    party: "",
                    partyAddress: "",
                    court: "",
                    wps: "",
                    attorney: "",
                    caseID: ""
                },
                termsRows: [],
                proceedingsRows: [],
                pleadingsRows: [],
                notesRows: [],
                termsColumnNames: ["Data", "Od", "Do", "Nazwa", "Miasto", "Notatka"],
                proceedingsColumnNames: ["Data", "Nazwa", "Miasto", "Notatka"],
                pleadingsColumnNames: ["Data", "Nazwa","Notatka"],
                notesColumnNames: ["Data", "Nazwa", "Notatka"],
                showElements: false
            }
        },
        mounted: function() {
            if(this.selectedCase){
                console.log("Mounted is working")
            }
        },
        methods: {
            displayCaseInfo: function(){
                this.resetCaseInfo()
                this.resetLists()
                this.getCaseInfo()
                this.getProceedings()
                this.getNotes()
                this.getPleadings()
                this.getTerms()
                this.showElements = true;
            },
            getProceedings: function(){
                let user = firebase.auth().currentUser;
                let userID = user.uid;
                let selectedCase = this.selectedCase;
                let proceedingsRows = this.proceedingsRows;
                db.collection('cases').doc(userID).collection('userCases').doc(selectedCase)
                    .collection('Proceedings')
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            let data = doc.data()
                            proceedingsRows.push({
                                date: data.date,
                                name: data.name,
                                city: data.city,
                                note: data.note
                            })
                            console.log("");
                        });
                    })
            },
            getCaseInfo: function(){
                let user = firebase.auth().currentUser;
                let userID = user.uid;
                let selectedCase = this.selectedCase;
                let caseInfo = this.caseInfo;
                db.collection('cases').doc(userID).collection('userCases')
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            if(doc.id == selectedCase){
                                let data = doc.data()
                                caseInfo.name = data.name;
                                caseInfo.attorney = data.attorney;
                                caseInfo.client = data.client;
                                caseInfo.party = data.party;
                                caseInfo.wps = data.wps;
                                caseInfo.partyAddress = data.partyAddress;
                                caseInfo.court = data.court;
                                caseInfo.clientAddress = data.clientAddress;
                            }
                            console.log(caseInfo);
                        });
                    })
            },
            getNotes: function(){
                let user = firebase.auth().currentUser;
                let userID = user.uid;
                let selectedCase = this.selectedCase;
                let notesRows = this.notesRows;
                db.collection('cases').doc(userID).collection('userCases').doc(selectedCase)
                    .collection('Notes')
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            let data = doc.data()
                            notesRows.push({
                                date: data.date,
                                name: data.name,
                                note: data.note
                            })
                            console.log("");
                        });
                    })
            },
            getPleadings: function(){
                let user = firebase.auth().currentUser;
                let userID = user.uid;
                let selectedCase = this.selectedCase;
                let pleadingsRows = this.pleadingsRows;
                db.collection('cases').doc(userID).collection('userCases').doc(selectedCase)
                    .collection('Pleadings')
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            let data = doc.data()
                            pleadingsRows.push({
                                date: data.date,
                                name: data.name,
                                note: data.note
                            })
                            console.log("");
                        });
                    })
            },
            getTerms: function(){
                let user = firebase.auth().currentUser;
                let userID = user.uid;
                let selectedCase = this.selectedCase;
                let termsRows = this.termsRows;
                db.collection('cases').doc(userID).collection('userCases').doc(selectedCase)
                    .collection('Terms')
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            let data = doc.data()
                            termsRows.push({
                                date: data.date,
                                startTime: data.startTime,
                                endTime: data.endTime,
                                name: data.name,
                                city: data.city,
                                note: data.note
                            })

                            console.log("");
                        });
                    })
            },
            resetLists: function(){
             this.proceedingsRows = [];
             this.pleadingsRows = [];
             this.notesRows = [];
             this.termsRows = [];
            },
            resetCaseInfo: function(){
                for(const property in this.caseInfo){
                    this.caseInfo[property] = "";
                }
            },
        },
        computed: {
            "termsColumns": function columns() {
                if (this.termsRows.length == 0) {
                    return [];
                }
                return Object.keys(this.termsRows[0])
            },
            "proceedingsColumns": function columns() {
                if (this.proceedingsRows.length == 0) {
                    return [];
                }
                return Object.keys(this.proceedingsRows[0])
            },
            "pleadingsColumns": function columns() {
                if (this.pleadingsRows.length == 0) {
                    return [];
                }
                return Object.keys(this.pleadingsRows[0])
            },
            "notesColumns": function columns() {
                if (this.notesRows.length == 0) {
                    return [];
                }
                return Object.keys(this.notesRows[0])
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