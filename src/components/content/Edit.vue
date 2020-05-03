<template>
    <div>
        <div class="container">
            <label>Wybierz akcję</label>
            <select class="browser-default" @change="displayForm" v-model="action">
                <option value="" disabled selected>Choose your option</option>
                <option  :value="'EditNote'" >Edytuj notatkę</option>
                <option  :value="'EditPleading'" >Edytuj pismo</option>
                <option  :value="'EditProceeding'" >Edytuj wydarzenie</option>
            </select>
        </div>
        <EditForm id="EditNote" hidden />
        <EditPleading id="EditPleading" hidden />
        <EditProceeding id="EditProceeding" hidden />
    </div>
</template>

<script>
    import EditForm from "../edit-forms/EditForm";
    import EditPleading from "../edit-forms/EditPleading";
    import EditProceeding from "../edit-forms/EditProceeding";
    export default {
        name: 'Edit',
        components: {
            EditForm,
            EditPleading,
            EditProceeding
        },

        methods: {
            displayForm: function () {
                this.hideAllForms()
                if (this.action == 'EditNote') {
                    document.getElementById('EditNote').hidden = false
                } else if (this.action == 'EditPleading') {
                    document.getElementById('EditPleading').hidden = false
                }else if (this.action == 'EditProceeding') {
                    document.getElementById('EditProceeding').hidden = false
                }
            },
            hideAllForms: function () {
                document.getElementById('EditNote').hidden = true
                document.getElementById('EditPleading').hidden = true
                document.getElementById('EditProceeding').hidden = true
            }
        }
    }
</script>