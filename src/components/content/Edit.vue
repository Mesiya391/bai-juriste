<template>
    <div>
        <div class="container">
            <label>Wybierz akcję</label>
            <select class="browser-default" @change="displayForm" v-model="action">
                <option value="" disabled selected>Choose your option</option>
                <option  :value="'EditNote'" >Edytuj notatkę</option>
                <option  :value="'EditPleading'" >Edytuj pismo</option>
            </select>
        </div>
        <EditForm id="EditNote" hidden />
        <EditPleading id="EditPleading" hidden />
    </div>
</template>

<script>
    import EditForm from "../edit-forms/EditForm";
    import EditPleading from "../edit-forms/EditPleading";
    export default {
        name: 'Edit',
        components: {
            EditForm,
            EditPleading
        },

        methods: {
            displayForm: function () {
                this.hideAllForms()
                if (this.action == 'EditNote') {
                    document.getElementById('EditNote').hidden = false
                } else if (this.action == 'EditPleading') {
                    document.getElementById('EditPleading').hidden = false
                }
            },
            hideAllForms: function () {
                document.getElementById('EditNote').hidden = true
                document.getElementById('EditPleading').hidden = true
            }
        }
    }
</script>