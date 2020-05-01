<template>
    <div @submit.prevent="deleteCase" class="signup container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Usuń sprawę</h2>
            <div class="field">
                <label>Wybierz sprawę </label>
                <select class="browser-default" v-model="caseDel">
                    <option value="" disabled selected>Choose your option</option>
                    <option v-for="item in caseList" :value="item" v-bind:key="item">{{item}}</option>
                </select>
            </div>
            <div class="field">
                <label>Wybierz rodzaj elementu do usunięcia</label>
                <select class="browser-default" v-model="chosenElement">
                    <option value="" disabled selected>Choose your option</option>
                    <option :value="'Terms'" >Usuń termin</option>
                    <option :value="'Pleadings'" >Usuń pismo</option>
                    <option :value="'Proceedings'" >Usuń wydarzenie</option>
                    <option :value="'Notes'" >Usuń notatkę</option>
                </select>
            </div>
            <div class="field">
                <label for="elementName">Wpisz nazwę elementu</label>
                <input type="text" name="elementName" v-model="elementName">
            </div>
            <p class="red-text center" v-if="feedback">{{feedback}}</p>
            <div class="field center">
                <button class="btn deep-purple">Usuń element sprawy</button>
            </div>
        </form>
    </div>


</template>

<script>
    import firebase from "firebase";
    import db from '@/firebase/init';

    export default {
        name: 'DeleteCaseElement',
        data(){
            return{
                caseDel: null,
                caseList: [],
                chosenElement: null,
                elementName: null,
                feedback: null
            }
        },
        methods: {
            deleteCase: function () {
                let user = firebase.auth().currentUser;
                let userID = user.uid
                db.collection('cases').doc(userID).collection('userCases').doc(this.caseDel).collection(this.chosenElement).doc(this.elementName).delete()
                    .then(() => {
                        this.feedback = 'Element successfully deleted';
                    })
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