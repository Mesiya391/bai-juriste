<template>
    <div>
        <div class="container">
            <label>Wybierz akcję</label>
            <select class="browser-default" @change="displayForm" v-model="action">
                <option value="" disabled selected>Choose your option</option>
                <option  :value="'EditNote'" >Edytuj notatkę</option>
            </select>
        </div>
        <EditForm id="EditNote" hidden />

    </div>
</template>

<script>
    import EditForm from "../edit-forms/EditForm";
    export default {
        name: 'Edit',
        components: {
            EditForm
        },
        methods: {
            displayForm: function(){
                this.hideAllForms()
                if(this.action == 'EditNote'){
                    document.getElementById('EditNote').hidden = false
                }
            },
            hideAllForms: function(){
                document.getElementById('EditNote').hidden = true
            }
        }

    }
</script>