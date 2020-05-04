<template>
    <div>
        <div class="container">
            <label>Wybierz akcję</label>
            <select class="browser-default" @change="displayForm" v-model="action">
                <option value="" disabled selected>Choose your option</option>
                <option  :value="'DeleteCase'" >Usuń sprawę</option>
                <option  :value="'DeleteCaseElement'" >Usuń element sprawy</option>
            </select>
        </div>
        <DeleteCase id="DeleteCase" hidden />
        <DeleteCaseElement id="DeleteCaseElement" hidden />
    </div>
</template>

<script>
    import DeleteCase from "../delete-forms/DeleteCase";
    import DeleteCaseElement from "../delete-forms/DeleteCaseElement";
    export default {
        name: 'Delete',
        components: {
            DeleteCase,
            DeleteCaseElement
        },
        methods: {
            displayForm: function(){
                this.hideAllForms()
                if(this.action == 'DeleteCase'){
                    document.getElementById('DeleteCase').hidden = false
                }else if(this.action == 'DeleteCaseElement'){
                    document.getElementById('DeleteCaseElement').hidden = false
                }
            },
            hideAllForms: function(){
                document.getElementById('DeleteCase').hidden = true
                document.getElementById('DeleteCaseElement').hidden = true
            }
        }

    }
</script>