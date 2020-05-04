<template>
  <div class="title">
    <Warning />
    <h3 class="center">Witaj w Juriste.pro</h3>

    <h3 class="center">Twój Google Calendar:</h3>
    <div class="home-components">
      <ProceedingsCalendarImport />


    </div>
  </div>
</template>
<script>
import firebase from "firebase";
import Warning from "../layout/Warning";
import ProceedingsCalendarImport from "../content/ProceedingsCalendarImport/ProceedingsCalendarImport";
export default {
  name: "Home",
  components: {
    Warning,
    ProceedingsCalendarImport,
  },
  data() {
    return {};
  },
  mounted() {
    console.log(firebase.auth().currentUser);
  },
};
</script>
<style>

.home-components > * {
  margin-bottom: 56px;
}
</style>
