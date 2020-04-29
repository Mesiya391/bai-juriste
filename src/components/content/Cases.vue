<template>
    <div>
        <label>Browser Select</label>
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
                selectedCase: null
            }
        },
        mounted() {
            if(this.selectedCase){
                console.log("Mounted is working")
            }
        },
        methods: {
            displayCaseInfo(){
              //  let user = firebase.auth().currentUser;
               // let userID = user.uid
                //let ref = db.collection('cases').doc(userID).collection('userCases').doc(this.selectedCase)
            }
        },
        computed: {
            options(){
                return Object.keys(this.clients).map(k => {
                    let o = this.clients[k]
                    return `${o.first_name} ${o.middle_name ? o.middle_name : ''} ${o.last_name}`
                })
            },
        },
        created() {
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