<template>
    <div @submit.prevent="createCase" class="AddCase container">
        <form class="card-panel">
            <h2 class="center deep-purple-text">Add Case</h2>
            <div class="field">
                <label for="name">Nazwa sprawy</label>
                <input type="text" name="name" v-model="name">
            </div>
            <div class="field">
                <label for="client">Klient</label>
                <input type="text" name="client" v-model="client">
            </div>
            <div class="field">
                <label for="clientAddress">Adres klienta</label>
                <input type="text" name="clientAddress" v-model="clientAddress">
            </div>
            <div class="field">
                <label for="party">Strona przeciwna</label>
                <input type="text" name="party" v-model="party">
            </div>
            <div class="field">
                <label for="partyAddress">Strona przeciwna adres</label>
                <input type="text" name="partyAddress" v-model="partyAddress">
            </div>
            <div class="field">
                <label for="court">Sąd</label>
                <input type="text" name="court" v-model="court">
            </div>
            <div class="field">
                <label for="wps">Wartość przedmiotu sporu</label>
                <input type="text" name="wps" v-model="wps">
            </div>
            <div class="field">
                <label for="attorney">Pełnomocnik strony przeciwnej</label>
                <input type="text" name="attorney" v-model="attorney">
            </div>
            <p class="red-text center" v-if="feedback">{{feedback}}</p>
            <div class="field center">
                <button class="btn deep-purple">Stwórz sprawę</button>
            </div>
        </form>
    </div>
</template>

<script>
    import firebase from 'firebase';
    export default {
        name : 'Add Case',
        data(){
            return{
                name: null,
                client: null,
                clientAddress: null,
                party: null,
                partyAddress: null,
                court: null,
                wps: null,
                attorney: null,
                feedback: null
            }
        },
        methods: {
            createCase(){
                if(this.name && this.client && this.clientAddress && this.party && this.partyAddress && this.court && this.wps && this.attorney){
                    let firestore = firebase.firestore()

                }else{
                    this.feedback = 'Please fill in all fields'
                }
            }
        }
    }
</script>

<style>
    .AddCase{
        max-width: 600px;
        margin-top: 60px;
    }
</style>