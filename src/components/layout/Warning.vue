<template>
    <div>
        <p id="warning1" class="center" @click="showColTerms">Masz {{colTerms.length}} terminów w tym samym dniu(Kliknij)</p>
        <div class="table container">
            <h3 hidden>Tego samego dnia</h3>
            <table class="centered highlight responsive-table" id="warningTable" @dblclick="hideTable" hidden>
                <thead>
                <tr>
                    <th v-for="col in columnList" v-bind:key="col"> {{ col }} </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in colTerms" v-bind:key="row">
                    <td v-for="column in termsColumns" v-bind:key="column">{{row[column]}}</td>
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
        name: 'Warning',
        data(){
            return{
                caseList: [],
                termsList: [],
                colTerms:[],
                currentDate: null,
                columnList: ["Nazwa", "Data", "Od", "Do", "Notatka", "Miasto"]
            }
        },
        computed: {
            "termsColumns": function columns() {
                return Object.keys(this.colTerms[0])
            },
        },
        methods:{
          showColTerms: function(){
              document.getElementById('warningTable').hidden = false;
              document.getElementById('showButton').hidden = true
          },
            hideTable: function(){
              document.getElementById('warningTable').hidden = true
            }
        },
        created: function() {
            let colTerms = this.colTerms
            let caseList = this.caseList
            let termsList = this.termsList
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
                })
                .then(function() {
                    let user = firebase.auth().currentUser;
                    let userID = user.uid
                    for(let i in caseList) {
                        db.collection('cases').doc(userID).collection('userCases').doc(caseList[i])
                            .collection("Terms")
                            .get()
                            .then(function (querySnapshot) {
                                querySnapshot.forEach(function (doc) {
                                    // doc.data() is never undefined for query doc snapshots
                                    let data = doc.data()
                                    termsList.push({
                                        name: data.name,
                                        date: data.date,
                                        startTime: data.startTime,
                                        endTime: data.endTime,
                                        note: data.note,
                                        city: data.city,
                                    })
                                    console.log(doc.id, " => ", doc.data(), termsList);
                                });
                            })
                            .catch(function (error) {
                                console.log("Error getting documents: ", error);
                            })
                        .then(function () {
                            for(let j in termsList){
                                for(let k in termsList){
                                    if(termsList[j].date == termsList[k].date && termsList[j].name != termsList[k].name && !colTerms.includes(termsList[j])){
                                        colTerms.push(termsList[j])
                                    }
                                }
                            }
                            console.log("colTerms", colTerms)
                        })
                    }
                })



        }

    }
</script>

<style>
    #warningTable{
        max-height: 50px;
        background-color: red;
    }
    #warning1{
        background-color: red;
    }
</style>