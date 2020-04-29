<template>
    <div>
        <label>Wybierz sprawę</label>
        <select class="browser-default" v-model="selectedCase">
            <option value="" disabled selected>Choose your option</option>
            <option v-for="item in caseList" :value="item" v-bind:key="item">{{item}}</option>
        </select>
        <button @click="displayCaseInfo" class="btn deep-purple">Wybierz</button>
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
                caseInfo: null,
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
                }
            }
        },
        mounted: function() {
            if(this.selectedCase){
                console.log("Mounted is working")
            }
        },
        methods: {
            displayCaseInfo: function(){
                this.getCaseInfo()
                this.getProceedings()
                this.getNotes()
                this.getPleadings()
                this.getTerms()
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
                                caseInfo = doc.data()
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