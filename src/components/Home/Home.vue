<template>
  <div class="title">
    <h2 class="center">Home Page</h2>
    <div class="home-components">
      <ProceedingsCalendarImport />

      <Warning />
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
