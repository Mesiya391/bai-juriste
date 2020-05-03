<template>
    <div>
        <div class="container">
            <label>Wybierz akcję</label>
            <select class="browser-default" @change="displayForm" v-model="action">
                <option value="" disabled selected>Choose your option</option>
                <option  :value="'EditNote'" >Edytuj notatkę</option>
                <option  :value="'EditPleading'" >Edytuj pismo</option>
                <option  :value="'EditProceeding'" >Edytuj wydarzenie</option>
                <option  :value="'EditTerm'" >Edytuj termin</option>
                <option  :value="'EditCaseInfo'" >Edytuj sprawę</option>
            </select>
        </div>
        <EditForm id="EditNote" hidden />
        <EditPleading id="EditPleading" hidden />
        <EditProceeding id="EditProceeding" hidden />
        <EditTerm id="EditTerm" hidden />
        <EditCaseInfo id="EditCaseInfo" hidden />
    </div>
</template>

<script>
    import EditForm from "../edit-forms/EditForm";
    import EditPleading from "../edit-forms/EditPleading";
    import EditProceeding from "../edit-forms/EditProceeding";
    import EditTerm from "../edit-forms/EditTerm";
    import EditCaseInfo from "../edit-forms/EditCaseInfo";
    export default {
        name: 'Edit',
        components: {
            EditForm,
            EditPleading,
            EditProceeding,
            EditTerm,
            EditCaseInfo
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
                }else if (this.action == 'EditTerm') {
                    document.getElementById('EditTerm').hidden = false
                }else if (this.action == 'EditCaseInfo') {
                    document.getElementById('EditCaseInfo').hidden = false
                }
            },
            hideAllForms: function () {
                document.getElementById('EditNote').hidden = true
                document.getElementById('EditPleading').hidden = true
                document.getElementById('EditProceeding').hidden = true
                document.getElementById('EditTerm').hidden = true
                document.getElementById('EditCaseInfo').hidden = true
            }
        }
    }
</script>