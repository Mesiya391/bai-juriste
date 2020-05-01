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
        <div>
            <h3 v-if="showElements">Pisma procesowe</h3>
            <table class="centered highlight responsive-table" v-if="showElements">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Note</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td v-for="item in pleadings.dates" v-bind:key="item">{{ item }}</td>
                    <td v-for="item in pleadings.names" v-bind:key="item">{{ item }}</td>
                    <td v-for="item in pleadings.notes" v-bind:key="item">{{ item }}</td>
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
                proceedings: {
                    names : [],
                    dates : [],
                    cities: [],
                    notes: []
                },
                notes: {
                    names: [],
                    dates: [],
                    notes: []
                },
                pleadings: {
                    names: [],
                    dates: [],
                    notes: []
                },
                terms: {
                    names: [],
                    dates: [],
                    startTimes: [],
                    endTimes: [],
                    cities: [],
                    notes: []
                },
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
                let proceedings = this.proceedings;
                db.collection('cases').doc(userID).collection('userCases').doc(selectedCase)
                    .collection('Proceedings')
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            let data = doc.data()
                            proceedings.names.push(data.name)
                            proceedings.cities.push(data.city)
                            proceedings.dates.push(data.date)
                            proceedings.notes.push(data.note)
                            console.log(proceedings.names);
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
                let notes = this.notes;
                db.collection('cases').doc(userID).collection('userCases').doc(selectedCase)
                    .collection('Notes')
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            let data = doc.data()
                            notes.names.push(data.name)
                            notes.dates.push(data.date)
                            notes.notes.push(data.note)
                            console.log(notes.names);
                        });
                    })
            },
            getPleadings: function(){
                let user = firebase.auth().currentUser;
                let userID = user.uid;
                let selectedCase = this.selectedCase;
                let pleadings = this.pleadings;
                db.collection('cases').doc(userID).collection('userCases').doc(selectedCase)
                    .collection('Pleadings')
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            let data = doc.data()
                            pleadings.names.push(data.name)
                            pleadings.dates.push(data.date)
                            pleadings.notes.push(data.note)
                            console.log(pleadings.names);
                        });
                    })
            },
            getTerms: function(){
                let user = firebase.auth().currentUser;
                let userID = user.uid;
                let selectedCase = this.selectedCase;
                let terms = this.terms;
                db.collection('cases').doc(userID).collection('userCases').doc(selectedCase)
                    .collection('Terms')
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            let data = doc.data()
                            terms.names.push(data.name)
                            terms.dates.push(data.date)
                            terms.startTimes.push(data.startTime)
                            terms.endTimes.push(data.endTime)
                            terms.cities.push(data.city)
                            terms.notes.push(data.note)
                            console.log(terms.names);
                        });
                    })
            },
            resetLists: function(){
                for(const property in this.proceedings) {
                    this.proceedings[property] = []
                }
                for(const property in this.notes) {
                    this.notes[property] = []
                }
                for(const property in this.terms) {
                    this.terms[property] = []
                }
                for(const property in this.pleadings) {
                    this.pleadings[property] = []
                }
            },
            resetCaseInfo: function(){
                for(const property in this.caseInfo){
                    this.caseInfo[property] = "";
                }
            }
        },
        computed: {

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