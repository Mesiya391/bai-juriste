<template>
    <div>
        <div class="container">
            <label>Wybierz akcję</label>
            <select class="browser-default" @change="displayForm" v-model="action">
                <option value="" disabled selected>Choose your option</option>
                <option  :value="'AddCase'" >Dodaj sprawę</option>
                <option  :value="'AddPleading'" >Dodaj pismo</option>
                <option  :value="'AddNote'" >Dodaj notatkę</option>
                <option  :value="'AddTerm'" >Dodaj termin</option>
                <option  :value="'AddProceeding'" >Dodaj wydarzenie</option>
            </select>
        </div>
        <AddTerm id="AddTerm" hidden />
        <AddProceeding id="AddProceeding" hidden />
        <AddPleading id="AddPleading" hidden/>
        <AddCase id="AddCase" hidden/>
        <AddNote id="AddNote" hidden/>
    </div>
</template>

<script>
    import AddTerm from "../forms/AddTerm";
    import AddProceeding from "../forms/AddProceeding";
    import AddPleading from "../forms/AddPleading";
    import AddCase from "../forms/AddCase";
    import AddNote from "../forms/AddNote";
    export default {
        name: 'Add',
        components: {
            AddNote,
            AddCase,
            AddPleading,
            AddProceeding,
            AddTerm
        },
        data() {
            return {
                action: null,
                showAddTerm: false,
                showAddProceeding: false,
                showAddPleading: false,
                showAddNote: false,
                showAddCase: false
            }
        },
        methods: {
            displayForm: function(){
                this.hideAllForms()
                if(this.action == 'AddCase'){
                    document.getElementById('AddCase').hidden = false
                }else if(this.action == 'AddTerm'){
                    document.getElementById('AddTerm').hidden = false
                }else if(this.action == 'AddProceeding'){
                    document.getElementById('AddProceeding').hidden = false
                }else if(this.action == 'AddPleading'){
                    document.getElementById('AddPleading').hidden = false
                }else if(this.action == 'AddNote'){
                    document.getElementById('AddNote').hidden = false
                }
                console.log(this.showAddNote, this.action)
            },
            hideAllForms: function(){
                document.getElementById('AddCase').hidden = true
                document.getElementById('AddTerm').hidden = true
                document.getElementById('AddProceeding').hidden = true
                document.getElementById('AddPleading').hidden = true
                document.getElementById('AddNote').hidden = true
            }

        }
    }
</script>

<style>

</style>